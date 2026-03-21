import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import AddressCardComponent from "@MEScreenComponents/profile/address/addressCard";
import AddressSheetComponent from "@MEScreenComponents/profile/address/addressSheet";
import AddressInformationNotFoundCardComponent from "@MEScreenComponents/profile/address/addressInformationNotFoundCard";

const AddressComponent = () => {
  const { user } = useSelector((state) => state.authentication);

  return (
    <div className="mt-5">
      {_.get(user, "school", null) ? (
        <>
          <AddressCardComponent />
          <AddressSheetComponent />
        </>
      ) : (
        <AddressInformationNotFoundCardComponent />
      )}
    </div>
  );
};

export default AddressComponent;
