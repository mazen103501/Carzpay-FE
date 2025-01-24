import React from "react";
import "./Table.scss";
import Pagination from "../Pagination/Pagination";

function Table({
  headers,
  data,
  hiddenPagination = false,
  pagination,
  pageChangeFn,
}) {
  function handlePageChange(page) {
    pageChangeFn(page);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="px-10 py-5">
            <tr className="text-[#B5B7C0] text-sm font-normal border-b-[1px] border-[#EEEEEE]">
              {headers.map((header, index) => (
                <th key={header.key}>{header.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="">
                {headers.map((header, headerIndex) => {
                  const cellData = item[header.key];
                  return (
                    <td key={header.key} className="p-3">
                      {cellData?.icon ? (
                        <img
                          src={cellData.icon}
                          alt="action-icon"
                          className="cursor-pointer m-auto"
                          onClick={cellData.onClick}
                        />
                      ) : (
                        <div
                          className={`px-5 py-1 my-1 m-auto ${
                            cellData?.styles || ""
                          }`}
                        >
                          {cellData?.data || cellData}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!hiddenPagination && (
        <Pagination
          totalPagesNum={pagination?.totalPages || 13}
          onPageChange={handlePageChange}
        ></Pagination>
      )}
    </>
  );
}

export default Table;
