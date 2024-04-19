import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Menu from "src/components/Menu.tsx";
import Header from "src/components/documents/Header.tsx";
import useDocsFilter from "src/hooks/useDocsFilter";
import FilteredTagsList from "src/components/documents/documentTags/FilteredTagsList";

const Collection = () => {
  const documents = useSelector((state) => state.documents.documents);
  const allDocumentsData = documents.data;

  const { selectedTags, handleTags } = useDocsFilter();

  const documentItems = allDocumentsData?.map((obj) => {
    const title =
      obj.title.length > 65 ? obj.title.slice(0, 65) + " ..." : obj.title;
    return (
      <div
        key={obj._id}
        className="bg-secondary p-4 rounded-md shadow-md relative"
      >
        <div className="cursor-pointer h-[16rem] text-sm bg-transparent text-gray-300 overflow-hidden">
          <Menu />
          <div className="text-[0.7rem] leading-4 mb-1 text-slate-400">
            <p className="">Last Updated On :</p>
            <p className="font-semibold">{obj.lastUpdatedAt}</p>
          </div>
          <Link to={`./editor?documentId=${obj._id}`}>
            <p className="font-medium leading-5 text-base hover:text-blue-700 transition-all">
              {title ? title : "Untitled"}
            </p>
          </Link>

          <div className="text-slate-400 text-xs mt-3">
            {parse(obj.content)}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="py-5 sm:px-6 px-4 max-w-6xl mx-auto">
      <Header selectedTags={selectedTags} handleTags={handleTags} />

      <FilteredTagsList
        selectedFilterTags={selectedTags}
        handleTags={handleTags}
      />

      <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 mt-3">
        {documentItems}
      </div>
    </div>
  );
};

export default Collection;
