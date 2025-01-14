import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";

const tableHeaders = ["Amount", "Due Date", "Status"];

function RepairShopDetails() {
  const [activeButton, setActiveButton] = useState("Paid");
  const { shopId } = useParams();

  const tableData = [
    {
      amount: { data: "001", for: "Amount" },
      dueDate: { data: "Mazen taha", for: "Due Date" },
      status: {
        data: "Paid",
        for: "Status",
        styles: "rounded-[4.5px] max-w-[110px] status approved",
      },
    },
    {
      amount: { data: "002", for: "Amount" },
      dueDate: { data: "Mazen taha 2", for: "Due Date" },
      status: {
        data: "Paid",
        for: "Status",
        styles: "rounded-[4.5px] max-w-[110px] status approved",
      },
    },
    {
      amount: { data: "003", for: "Amount" },
      dueDate: { data: "Mazen taha 3", for: "Due Date" },
      status: {
        data: "Un Paid",
        for: "Status",
        styles: "rounded-[4.5px] max-w-[110px] status rejected",
      },
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-header">Repair Shop</h1>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">User Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Arabic Name"
              label="Arabic Name"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="English Name"
              label="English Name"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Phone Number"
              label="Phone Number"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="whatsapp Phone Number"
              label="whatsapp Phone Number"
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="px-5 py-3 flex flex-wrap gap-5">
          <div className="w-full min-w-[220px]">
            <Input
              placeholder="Arabic Description"
              label="Arabic Description"
              disabled={true}
            ></Input>
          </div>
          <div className="w-full min-w-[220px]">
            <Input
              placeholder="English Description"
              label="English Description"
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="p-5 pt-3 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="City" label="City" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Area" label="Area" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Location"
              label="Lat/Long"
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Payments</p>
        </div>
        <div className="p-8">
          <div>
            <button
              className={`font-semibold  px-9 py-2 rounded-xl mr-4 ${
                activeButton === "Paid"
                  ? "text-white bg-primary"
                  : "text-primary bg-[#F1F1F1]"
              }`}
              onClick={() => setActiveButton("Paid")}
            >
              Paid
            </button>
            <button
              className={`font-semibold  px-9 py-2 rounded-xl ${
                activeButton === "Unpaid"
                  ? "text-white bg-primary"
                  : "text-primary bg-[#F1F1F1]"
              }`}
              onClick={() => setActiveButton("Unpaid")}
            >
              Unpaid
            </button>
          </div>
          <div className="mt-8">
            <Table
              headers={tableHeaders}
              data={tableData}
              hiddenPagination={true}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairShopDetails;
