import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setLogin } from '@MERedux/signIn/signInSlice';
import { getAuthData } from '@MEHelpers/authHelpers';

const AuthChecker = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authData = getAuthData();

    if (authData) {
      dispatch(setLogin({ 
        userData: authData.user, 
        token: authData.token,
        isValidUser: true 
      }));
    }
  }, [dispatch]);

  return children;
};

export default AuthChecker;
