import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPage,
  setTotalPage,
}) => {
  console.log('totalPage: ', totalPage);

  return (
    // <div className=" flex w-full justify-center gap-4 mx-auto ">
    //   <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
    //   <button>{currentPage}</button>
    //   <button onClick={() => setCurrentPage(currentPage + 1)}>Prev</button>
    // </div>
    <div className="flex w-full justify-center gap-4 mx-auto">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1} // Disable the button if currentPage is 1
      >
        Prev
      </button>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none">
        {currentPage}
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
