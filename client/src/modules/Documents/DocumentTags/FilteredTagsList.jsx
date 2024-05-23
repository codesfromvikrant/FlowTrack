import { useSelector } from "react-redux";
import { IoCloseCircleSharp } from "react-icons/io5";

const FilteredTagsList = ({ selectedFilterTags, handleTags }) => {
  const documentTags = useSelector((state) => state.documents.tags.data);
  const tags_selected = documentTags.filter((tag) =>
    selectedFilterTags.includes(tag._id)
  );

  const tagsSelectedList =
    tags_selected &&
    Object.entries(tags_selected).map(([key, value]) => {
      return (
        <li
          key={key}
          className="bg-glassyblue border-2 border-blue-600 text-gray-200 tracking-wide px-2 py-1 rounded font-semibold capitalize text-xs flex justify-between items-center gap-1"
        >
          <p>{value.name}</p>
          <IoCloseCircleSharp
            onClick={() => handleTags(value._id)}
            className="text-base text-gray-300 hover:text-red-500 transition-all duration-300 cursor-pointer"
          />
        </li>
      );
    });

  return (
    <div className="mt-2">
      <ul className="flex justify-start items-center gap-2">
        {tagsSelectedList}
      </ul>{" "}
    </div>
  );
};

export default FilteredTagsList;
