import React from "react";
import Tags from "./index";
import Button from "../Button";

const AddTags = () => {
  return (
    <div>
      <Tags />

      <div className="">
        <input type="text" />
        <Button label="Add" />
      </div>
    </div>
  );
};

export default AddTags;
