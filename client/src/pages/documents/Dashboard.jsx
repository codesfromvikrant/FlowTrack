import { useSelector } from "react-redux";
import Header from "@/modules/Documents/Header";
import useDocsFilter from "@/hooks/useDocsFilter";
import FilteredTagsList from "@/modules/Documents/DocumentTags/FilteredTagsList";
import Pagination from "@/components/Pagination";
import DocumentCards from "@/modules/Documents/DocumentCards";

const DocumentsDashboard = () => {
  const { documents } = useSelector((state) => state.documents);
  const allDocumentsData = documents.data;

  const { selectedTags, limit, searchTerm, handleTags, handleSearch } =
    useDocsFilter();

  const documentItems = allDocumentsData.map((obj) => {
    return <DocumentCards key={obj._id} data={obj} />;
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

      <p className="text-slate-600 text-lg font-semibold tracking-wide">
        {searchTerm
          ? `Searched Documents (${allDocumentsData.length})`
          : `All Documents (${allDocumentsData.length})`}
      </p>
      <div className="grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 my-2">
        {documentItems}
      </div>

      <Pagination totalCount={2000} limit={limit} />
    </div>
  );
};

export default DocumentsDashboard;
