import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";

import AddressCardComponent from "@MEScreenComponents/profile/address/addressCard";

const AddressComponent = () => {
  return (
    <div className="mt-5">
      <AddressCardComponent />
    </div>
  );
};

export default AddressComponent;
