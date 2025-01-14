import React from "react";
import "./Table.scss";
import Pagination from "../Pagination/Pagination";

const toCamelCase = (str) =>
  str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");

function Table({ headers, data, hiddenPagination = false }) {
  function handlePageChange(page) {
    console.log(page);
  }

  return (
    <>
      <table className="w-full border-collapse">
        <thead className="px-10 py-5">
          <tr className="text-[#B5B7C0] text-sm font-normal border-b-[1px] border-[#EEEEEE]">
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="">
              {headers.map((header, headerIndex) => {
                const cellData = item[toCamelCase(header)];
                return (
                  <td key={headerIndex} className="p-3">
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
                        {cellData?.data}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {!hiddenPagination && (
        <Pagination onPageChange={handlePageChange}></Pagination>
      )}
    </>
  );
}

export default Table;
