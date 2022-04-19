import DataTable from 'react-data-table-component';


export default function Table({ data, columns, paginationProp }) {

    function getNumberOfPages(rowCount, rowsPerPage) {
        return Math.ceil(rowCount / rowsPerPage);
      }
      
      function toPages(pages) {
        const results = [];
      
        for (let i = 1; i < pages; i++) {
          results.push(i);
        }
      
        return results;
      }

    const BootyPagination = ({
        rowsPerPage,
        rowCount,
        onChangePage,
        onChangeRowsPerPage, // available but not used here
        currentPage
      }) => {
        const handleBackButtonClick = () => {
          onChangePage(currentPage - 1);
        };
      
        const handleNextButtonClick = () => {
          onChangePage(currentPage + 1);
        };
      
        const handlePageNumber = (e) => {
          onChangePage(Number(e.target.value));
        };
      
        const pages = getNumberOfPages(rowCount, rowsPerPage);
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === pageItems.length;
        const previosDisabled = currentPage === 1;
      
        return (
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleBackButtonClick}
                  disabled={previosDisabled}
                  aria-disabled={previosDisabled}
                  aria-label="previous page"
                >
                  Previous
                </button>
              </li>
              {pageItems.map((page) => {
                const className =
                  page === currentPage ? "page-item active" : "page-item";
      
                return (
                  <li key={page} className={className}>
                    <button
                      className="page-link"
                      onClick={handlePageNumber}
                      value={page}
                    >
                      {page}
                    </button>
                  </li>
                );
              })}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={handleNextButtonClick}
                  disabled={nextDisabled}
                  aria-disabled={nextDisabled}
                  aria-label="next page"
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        );
      };

    return (
        <DataTable
            direction="auto"
            fixedHeaderScrollHeight="300px"
            responsive
            subHeaderAlign="right"
            subHeaderWrap
            columns={columns}
            data={data}
            noDataComponent="Nincs visszatérő adat"
            pagination
            paginationRowsPerPageOptions={[10,15]}
        />
    );
};