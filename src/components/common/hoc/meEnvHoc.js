import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { apiStatusCode } from "@MEUtils/enums";
import { useSelector, useDispatch } from "react-redux";
// import { setApiResponseStatus } from "@MERedux/mockSetup/mockSlice";

import PropTypes from "prop-types";
import _ from "lodash";

const MEEnvHoc = ({ children }) => {
  const { apiResponseStatus } = useSelector((state) => state.mock);
  const dispatch = useDispatch();

  return (
    <>
      <div className="h-16 bg-danger flex items-center justify-end pr-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-accent pr-5 pl-5 rounded-sm">
            API Status {apiResponseStatus}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-10">
            <DropdownMenuLabel>API Status Code</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* {apiStatusCode &&
              _.map(apiStatusCode, (value, key) => {
                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => dispatch(setApiResponseStatus(value))}
                    className={
                      apiResponseStatus === value ? "text-primary" : "text-dark"
                    }
                  >
                    {value}
                  </DropdownMenuItem>
                );
              })} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </>
  );
};

MEEnvHoc.propTypes = {
  children: PropTypes.any,
};

export default MEEnvHoc;
