import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./TicketDetails.scss";
import ProgressStepper from "../../../components/ProgressStepper/ProgressStepper";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";

const statuses = ["Pending", "In Progress", "Resolved", "Closed", "Reopened"];

const tableHeaders = ["Amount", "Due Date", "Status"];

function TicketDetails() {
  const { ticketId } = useParams();

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
      <h1 className="page-header">Ticket</h1>

      <div className="box-container">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Status</p>
        </div>
        <div className="px-16 pt-9 pb-16">
          <ProgressStepper></ProgressStepper>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">User Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Name" label="Name" disabled={true}></Input>
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
              placeholder="Requested Amount"
              label="Requested Amount"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Credit Amount"
              label="Credit Amount"
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Request Date"
              label="Request Date"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Expiry Date"
              label="Expiry Date"
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Bank Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Bank" label="Bank" disabled={true}></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Repair Shop</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Name" label="Name" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="City" label="City" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Area" label="Area" disabled={true}></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Car Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Maker" label="Maker" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Model" label="Model" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input placeholder="Year" label="Year" disabled={true}></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Plate Number"
              label="Plate Number"
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Payments</p>
        </div>
        <div className="mt-7 px-6">
          <Table
            headers={tableHeaders}
            data={tableData}
            hiddenPagination={true}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
