import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCaretBackCircle } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const todayDate = date.toLocaleDateString("en-US", options);

const Editor = () => {
  return (
    <div className="max-w-4xl mx-auto bg-secondary py-4 sm:px-6 px-3 rounded-lg shadow-md mt-4 ">
      <div className="flex justify-between sm:items-center items-start gap-2 sm:flex-row flex-col py-3 border-b-[1px] border-blureffect mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
        >
          <IoCaretBackCircle />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>
        <div className="flex justify-start items-center flex-wrap gap-2">
          <div className="relative">
            <button
              onClick={() => dispatch(openAddTagDialog())}
              className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
            >
              <span className="text-sm font-semibold tracking-wide">
                Add Tags
              </span>
              <ImPriceTags />
            </button>
            {/* {addTagDialog && (
              <AddTags
                tagsSelected={tagsSelected}
                addTagsSelected={addTagsSelected}
              />
            )} */}
          </div>
          <button
            onClick={delete_data}
            className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-semibold tracking-wide">Delete</span>
            <FaTrash />
          </button>
          <button
            onClick={publish_data}
            className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-semibold tracking-wide">Publish</span>
            <MdPublish className="text-xl" />
          </button>
        </div>
      </div>

      <input
        value={data.title}
        onChange={handleTitleChange}
        className="bg-transparent w-full outline-none mb-4 py-2 text-gray-200 placeholder:text-blureffect placeholder:font-extrabold font-semibold md:text-4xl text-3xl"
        type="text"
        placeholder="New Post Title Here..."
      />

      <ReactQuill
        value={data.content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default Editor;
