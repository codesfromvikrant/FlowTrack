import React from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { createNewTag } from "src/features/documentsSlice";

const AddTag = () => {
  const tagError = useSelector((state) => state.documents.tags.error);

  return (
    <div className="">
      <Formik
        initialValues={{ tag: "" }}
        onSubmit={(values) => {
          const data = { name: values.tag, category: "documents" };
          dispatch(createNewTag(data));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="tag"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.tag}
              placeholder="Create New Tag"
              className="text-xs placeholder:text-xs bg-secondary p-2 mt-2 rounded-md text-gray-200  outline-none"
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddTag;
