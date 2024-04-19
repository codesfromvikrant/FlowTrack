import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Filtering = () => {
  const dispatch = useDispatch();

  // const tagsList =
  //   tagsAvailable &&
  //   tagsAvailable.map((tag) => {
  //     const style = {
  //       color: tagsSelected.includes(tag) ? "#3b82f6" : "#e5e7eb",
  //     };
  //     return (
  //       <div
  //         key={tag}
  //         onClick={() => {
  //           filteredTagSelected(tag);
  //         }}
  //         style={style}
  //         className="flex justify-between items-center  transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:text-blue-600 cursor-pointer"
  //       >
  //         <span className="text-sm font-semibold capitalize tracking-wider"></span>
  //         <FaCheck className="text-sm" />
  //       </div>
  //     );
  //   });

  return <div>No Tags Available</div>;
};

export default Filtering;
