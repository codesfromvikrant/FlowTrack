import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Menu from "src/components/Menu";
import Header from "src/components/documents/Header";
import useDocsFilter from "src/hooks/useDocsFilter";
import FilteredTagsList from "src/components/documents/documentTags/FilteredTagsList";
import Pagination from "src/components/Pagination";

const DocumentsLayout = () => {
  const documents = useSelector((state) => state.documents.documents);
  const allDocumentsData = documents.data;

  const { selectedTags, docsPerPage, searchTerm, handleTags, handleSearch } =
    useDocsFilter();

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
      <Header
        selectedTags={selectedTags}
        handleTags={handleTags}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
      />

      <FilteredTagsList
        selectedFilterTags={selectedTags}
        handleTags={handleTags}
      />

      <p className="text-slate-200 text-lg font-semibold tracking-wide">
        {searchTerm
          ? `Searched Documents (${allDocumentsData.length})`
          : `All Documents (${allDocumentsData.length})`}
      </p>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 my-2">
        {documentItems}
      </div>

      <Pagination totalCount={2000} docsPerPage={docsPerPage} />
    </div>
  );
};

export default DocumentsLayout;
