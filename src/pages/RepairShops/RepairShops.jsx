import React from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import InfoIcon from "../../../public/info.svg";
import LocationIcon from "../../../public/location-sign.svg";

const areaOptions = [
  { value: "", label: "Area" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const cityOptions = [
  { value: "", label: "City" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const tableHeaders = [
  "Name",
  "Phone Number",
  "Whatsapp Phone Number",
  "City",
  "Area",
  "Location",
  "Actions",
];

function RepairShops() {
  const navigate = useNavigate();

  const tableData = [
    {
      city: { data: "001", for: "City" },
      name: { data: "John Doe", for: "Name" },
      phoneNumber: { data: "123-456-7890", for: "Phone Number" },
      whatsappPhoneNumber: { data: "$1,000", for: "Whatsapp Phone Number" },
      area: { data: "2023-10-01", for: "Area" },
      location: { data: "2023-10-01", for: "Location", icon: LocationIcon },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/repair-shops/32"),
      },
    },
    {
      city: { data: "001", for: "City" },
      name: { data: "John Doe", for: "Name" },
      phoneNumber: { data: "123-456-7890", for: "Phone Number" },
      whatsappPhoneNumber: { data: "$1,000", for: "Whatsapp Phone Number" },
      area: { data: "2023-10-01", for: "Area" },
      location: { data: "2023-10-01", for: "Location", icon: LocationIcon },
      actions: {
        icon: InfoIcon,
        for: "Actions",
        onClick: () => navigate("/repair-shops/32"),
      },
    },
  ];

  function NameChange(e) {
    console.log(e.target.value);
  }

  function phoneNumberChange(e) {
    console.log(e.target.value);
  }

  function handleSelectChange(e) {
    console.log(e.target.value);
  }
  return (
    <div className="page-container">
      <h1 className="page-header">Repair Shops</h1>
      <div className="box-container overflow-x-auto px-6 pt-[30px] pb-10 flex flex-wrap ">
        <div className="mr-4 w-1/5">
          <Input placeholder="Name" onChange={(e) => NameChange(e)} />
        </div>
        <div className="mr-4 w-1/5">
          <Input
            placeholder="Phone Number"
            onChange={(e) => phoneNumberChange(e)}
          />
        </div>
        <div className="mr-4 w-1/5">
          <Select
            options={areaOptions}
            onChange={(e) => handleSelectChange(e)}
          />
        </div>
        <div className="mr-4 w-1/5">
          <Select
            options={cityOptions}
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

export default RepairShops;
