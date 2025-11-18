import axios from "axios";

// HTTP Status Code Enums
const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  NETWORK_ERROR: 0,
};

// API Response Message Enums
const API_RESPONSE_MESSAGES = {
  SUCCESS: "Operation completed successfully",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  VALIDATION_ERROR: "Please check your input and try again",
  UNAUTHORIZED: "You are not authorized to perform this action",
  ACCESS_DENIED: "Access denied - insufficient permissions",
  NOT_FOUND: "The requested resource was not found",
  SERVER_ERROR: "Internal server error - please try again later",
  NETWORK_ERROR: "Network error - unable to connect to server",
  REQUEST_FAILED: "Request failed - please try again",
  UNKNOWN_ERROR: "An unexpected error occurred",
  TIMEOUT_ERROR: "Request timeout - please try again",
  RATE_LIMIT_EXCEEDED: "Too many requests - please wait before trying again",
};

// API Configuration
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    CONTENT_TYPE: "application/json",
  },
};

// Authorization utility functions
const isAPIServedSuccessfully = (response) =>
  response.status === 200 || response.status === 201;

/**
 * Check if user is authorized based on response
 * @param {Object} response - Axios response object
 * @returns {boolean} - Whether user is authorized
 */
const isAuthorizedUser = (response) => {
  // Check if response indicates valid authorization
  if (!response) return false;
  
  // If 401 or 403, user is not authorized
  if (response.status === HTTP_STATUS_CODES.UNAUTHORIZED || 
      response.status === HTTP_STATUS_CODES.FORBIDDEN) {
    return false;
  }
  
  // Check if response data indicates authorization issues
  const responseData = response.data;
  if (responseData && responseData.message) {
    const authErrorKeywords = ['unauthorized', 'forbidden', 'invalid token', 'expired token'];
    const message = responseData.message.toLowerCase();
    return !authErrorKeywords.some(keyword => message.includes(keyword));
  }
  
  return true;
};

/**
 * Handle user logout and redirect
 * @param {string} redirectPath - Path to redirect to after logout
 */
const handleUnauthorizedUser = (redirectPath = '/signin') => {
  // Clear authentication data from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('refreshToken');
  
  // Clear any other auth-related storage
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userData');
  
  // Dispatch sign out action if store is available
  // This will be handled by the Redux store when integrated
  
  // Redirect to sign-in page
  if (typeof window !== 'undefined') {
    window.location.href = redirectPath;
  }
};

/**
 * Axios instance with standardized response format
 * 
 * Returns consistent response structure:
 * {
 *   message: string,  // Success/error message
 *   status: number,   // HTTP status code
 *   data: array      // Response data (always array)
 * }
 * 
 * @example
 * // Success response
 * {
 *   message: "Operation completed successfully",
 *   status: 200,
 *   data: [{ id: 1, name: "John" }]
 * }
 * 
 * @example  
 * // Error response
 * {
 *   message: "Unauthorized access",
 *   status: 401,
 *   data: []
 * }
 */
const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": API_CONFIG.HEADERS.CONTENT_TYPE,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = config.state;
    delete config.state;

    if (
      state &&
      state.authentication &&
      state.authentication.user &&
      state.authentication.user.token
    ) {
      config.headers.Authorization = `Bearer ${state.authentication.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Response format: {message, status, data}
    if (response && response.status && isAPIServedSuccessfully(response)) {
      return {
        message: response.data?.message || response.statusText || API_RESPONSE_MESSAGES.SUCCESS,
        status: response.status,
        data: Array.isArray(response.data?.data) 
          ? response.data.data 
          : Array.isArray(response.data) 
          ? response.data 
          : response.data ? [response.data] : []
      };
    }

    // Fallback for unsuccessful responses
    return {
      message: response?.data?.message || response?.statusText || API_RESPONSE_MESSAGES.UNKNOWN_ERROR,
      status: response?.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      data: []
    };
  },
  (error) => {
    // Enhanced error response format: {message, status, data}
    let standardizedErrorResponse = {
      message: API_RESPONSE_MESSAGES.UNKNOWN_ERROR,
      status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      data: []
    };

    if (error && error.response) {
      const statusCode = error.response.status;
      
      // Handle authorization errors with automatic logout and redirect
      if (statusCode === HTTP_STATUS_CODES.UNAUTHORIZED) {
        if (!isAuthorizedUser(error.response)) {
          console.warn('User authorization failed - redirecting to sign-in');
          
          // Handle unauthorized user with cleanup and redirect
          handleUnauthorizedUser('/signin');
          
          // Return early with standardized unauthorized response
          return Promise.reject({
            message: API_RESPONSE_MESSAGES.UNAUTHORIZED,
            status: HTTP_STATUS_CODES.UNAUTHORIZED,
            data: []
          });
        }
      }
      
      // Handle forbidden access (different from unauthorized)
      if (statusCode === HTTP_STATUS_CODES.FORBIDDEN) {
        console.warn('Access forbidden - user lacks required permissions');
      }

      // Extract error message from response or provide default based on status code
      let errorMessage = error.response.data?.message || error.response.statusText;
      
      // Provide user-friendly default messages for common HTTP status codes
      if (!errorMessage) {
        switch (statusCode) {
          case HTTP_STATUS_CODES.BAD_REQUEST:
            errorMessage = API_RESPONSE_MESSAGES.VALIDATION_ERROR;
            break;
          case HTTP_STATUS_CODES.UNAUTHORIZED:
            errorMessage = API_RESPONSE_MESSAGES.UNAUTHORIZED;
            break;
          case HTTP_STATUS_CODES.FORBIDDEN:
            errorMessage = API_RESPONSE_MESSAGES.ACCESS_DENIED;
            break;
          case HTTP_STATUS_CODES.NOT_FOUND:
            errorMessage = API_RESPONSE_MESSAGES.NOT_FOUND;
            break;
          case HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY:
            errorMessage = API_RESPONSE_MESSAGES.VALIDATION_ERROR;
            break;
          case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
            errorMessage = API_RESPONSE_MESSAGES.RATE_LIMIT_EXCEEDED;
            break;
          case HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR:
          case HTTP_STATUS_CODES.BAD_GATEWAY:
          case HTTP_STATUS_CODES.SERVICE_UNAVAILABLE:
          case HTTP_STATUS_CODES.GATEWAY_TIMEOUT:
            errorMessage = API_RESPONSE_MESSAGES.SERVER_ERROR;
            break;
          default:
            errorMessage = `HTTP ${statusCode} Error`;
        }
      }

      standardizedErrorResponse = {
        message: errorMessage,
        status: statusCode,
        data: error.response.data?.data || []
      };

      return Promise.reject(standardizedErrorResponse);
    }

    // Handle network connectivity errors
    if (error.request) {
      standardizedErrorResponse = {
        message: API_RESPONSE_MESSAGES.NETWORK_ERROR,
        status: HTTP_STATUS_CODES.NETWORK_ERROR,
        data: []
      };
    } else if (error.code === 'ECONNABORTED') {
      // Handle timeout errors
      standardizedErrorResponse = {
        message: API_RESPONSE_MESSAGES.TIMEOUT_ERROR,
        status: HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
        data: []
      };
    } else if (error.message) {
      // Handle other request setup errors
      standardizedErrorResponse = {
        message: error.message || API_RESPONSE_MESSAGES.REQUEST_FAILED,
        status: HTTP_STATUS_CODES.BAD_REQUEST,
        data: []
      };
    }

    console.error('API Error Details:', {
      originalError: error,
      standardizedResponse: standardizedErrorResponse,
      timestamp: new Date().toISOString()
    });
    
    return Promise.reject(standardizedErrorResponse);
  }
);

// Export enums and utilities for use in other components
export { 
  HTTP_STATUS_CODES, 
  API_RESPONSE_MESSAGES, 
  API_CONFIG, 
  isAuthorizedUser, 
  handleUnauthorizedUser 
};

export default axiosInstance;
