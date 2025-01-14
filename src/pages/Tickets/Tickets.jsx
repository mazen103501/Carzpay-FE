import React from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Table from "../../components/Table/Table";
import InfoIcon from "../../../public/info.svg";
import { useNavigate } from "react-router-dom";

const bankOptions = [
  { value: "", label: "Bank" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const statusOptions = [
  { value: "", label: "Status" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const tableHeaders = [
  "Code",
  "Name",
  "Phone Number",
  "Approved Amount",
  "Request Data",
  "Status",
  "Actions",
];

function Tickets() {
  const navigate = useNavigate();

  function phoneNumberChange(e) {
    console.log(e.target.value);
  }

  function handleSelectChange(e) {
    console.log(e.target.value);
  }

  const tableData = [
    {
      code: { data: "001", for: "Code" },
      name: { data: "John Doe", for: "Name" },
      phoneNumber: { data: "123-456-7890", for: "Phone Number" },
      approvedAmount: { data: "$1,000", for: "Approved Amount" },
      requestData: { data: "2023-10-01", for: "Request Data" },
      status: {
        data: "Approved",
        for: "Status",
        styles: "status approved",
      },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/tickets/32"),
      },
    },
    {
      code: { data: "002", for: "Code" },
      name: { data: "Jane Smith", for: "Name" },
      phoneNumber: { data: "987-654-3210", for: "Phone Number" },
      approvedAmount: { data: "$2,000", for: "Approved Amount" },
      requestData: { data: "2023-10-02", for: "Request Data" },
      status: {
        data: "Pending",
        for: "Status",
        styles: "status pending",
      },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/tickets/32"),
      },
    },
    {
      code: { data: "003", for: "Code" },
      name: { data: "Alice Johnson", for: "Name" },
      phoneNumber: { data: "555-123-4567", for: "Phone Number" },
      approvedAmount: { data: "$1,500", for: "Approved Amount" },
      requestData: { data: "2023-10-03", for: "Request Data" },
      status: {
        data: "Rejected",
        for: "Status",
        styles: "status rejected",
      },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/tickets/32"),
      },
    },
    {
      code: { data: "004", for: "Code" },
      name: { data: "Bob Brown", for: "Name" },
      phoneNumber: { data: "444-555-6666", for: "Phone Number" },
      approvedAmount: { data: "$3,000", for: "Approved Amount" },
      requestData: { data: "2023-10-04", for: "Request Data" },
      status: {
        data: "Approved",
        for: "Status",
        styles: "status approved",
      },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/tickets/32"),
      },
    },
    {
      code: { data: "005", for: "Code" },
      name: { data: "Charlie Davis", for: "Name" },
      phoneNumber: { data: "333-444-5555", for: "Phone Number" },
      approvedAmount: { data: "$2,500", for: "Approved Amount" },
      requestData: { data: "2023-10-05", for: "Request Data" },
      status: {
        data: "Pending",
        for: "Status",
        styles: "status pending",
      },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/tickets/32"),
      },
    },
  ];

  return (
    <div className="page-container">
      <h1 className="page-header">Tickets</h1>
      <div className="box-container overflow-x-auto px-6 pt-[30px] pb-10 flex flex-wrap ">
        <div className="mr-2 w-1/4">
          <Input
            placeholder="Phone Number"
            onChange={(e) => phoneNumberChange(e)}
          />
        </div>
        <div className="mr-2 w-1/4">
          <Select
            options={bankOptions}
            onChange={(e) => handleSelectChange(e)}
          />
        </div>
        <div className="mr-2 w-1/4">
          <Select
            options={statusOptions}
            onChange={(e) => handleSelectChange(e)}
          />
        </div>
      </div>
      <div className="box-container mt-8 py-5">
        <Table headers={tableHeaders} data={tableData} />
      </div>
    </div>
  );
}

export default Tickets;
