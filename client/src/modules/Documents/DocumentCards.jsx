import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const DocumentCards = ({ data }) => {
  const title =
    data.title.length > 65 ? data.title.slice(0, 65) + " ..." : data.title;

  const menulist = [
    {
      text: "Edit",
      onClick: () => {
        console.log("edit");
      },
    },
    {
      text: "Delete",
      onClick: () => {
        console.log("delete");
      },
    },
  ];

  return (
    <div
      key={data._id}
      className="bg-secondary p-4 rounded-md shadow-md relative"
    >
      <div className="cursor-pointer h-[16rem] text-sm bg-transparent overflow-hidden">
        <div className="flex justify-between items-start gap-4 text-muted-foreground">
          <div className="text-[0.7rem] leading-4 mb-1">
            <p className="">Last Updated On :</p>
            <p className="font-semibold">{data.lastUpdatedAt}</p>
          </div>
        </div>
        <Link to={`./editor?documentId=${data._id}`}>
          <p className="font-semibold leading-5 text-base text-secondary-foreground hover:text-blue-700 transition-all">
            {title ? title : "Untitled"}
          </p>
        </Link>

        <div className="text-muted-foreground text-xs mt-3">
          {parse(data.content)}
        </div>
      </div>
    </div>
  );
};

export default DocumentCards;
