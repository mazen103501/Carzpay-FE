import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table/Table";
import InfoIcon from "../../../public/info.svg";
import LocationIcon from "../../../public/location-sign.svg";
import Loading from "../../components/Loading/Loading";
import { get, post } from "../../utils/api";
import { toast } from "react-toastify";
import { fetchLookupData } from "../../utils/fetchLookup";

const cityFirstValue = { value: "", label: "City" };

const areaFirstValue = { value: "", label: "Area" };

const tableHeaders = [
  { label: "Name", key: "name" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Whatsapp Phone Number", key: "whatsappPhoneNumber" },
  { label: "City", key: "city" },
  { label: "Area", key: "area" },
  { label: "Location", key: "location" },
  { label: "Actions", key: "actions" },
];

function RepairShops() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tablePagination, setTablePagination] = useState({
    pageSize: 15,
    totalPages: 3,
  });
  const [loading, setLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(false);
  const [cityOptions, setCityOptions] = useState([cityFirstValue]);
  const [areaOptions, setAreaOptions] = useState([areaFirstValue]);

  useEffect(() => {
    if (isInitialMount) {
      const timer = setTimeout(() => {
        fetchPaginatedData(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [name, phoneNumber]);

  useEffect(() => {
    if (isInitialMount) {
      fetchPaginatedData(1);
    }
  }, [area, city]);

  useEffect(() => {
    if (isInitialMount) {
      cityOptionsChange();
    }
  }, [city]);

  useEffect(() => {
    fetchPaginatedData(1);
    fetchCityOptions();
    setIsInitialMount(true);
  }, []);

  const fetchData = async (name, phoneNumber, area, city, pageNumber) => {
    setLoading(true);

    const payload = { pageNumber };
    if (name) payload.name = name;
    if (phoneNumber) payload.phoneNumber = phoneNumber;
    if (area) payload.areaId = +area;
    if (city) payload.cityId = +city;

    if (!city && area) {
      return;
    }

    try {
      const res = await post("/repair-shop/search", payload);
      if (res.status.isSuccess) {
        const pagination = res.pagination;
        const tableData = res.data.repairShops.map((item) => {
          const location = `${item.latitude}, ${item.longitude}`;
          item.area = item.area.name;
          item.city = item.city.name;
          item.location = {
            data: `${item.latitude}, ${item.longitude}`,
            icon: LocationIcon,
            onClick: () => locationClicked(location),
          };
          item.actions = {
            icon: InfoIcon,
            onClick: () => navigate(`/repair-shops/${item.id}`),
          };
          return item;
        });
        setTableData(tableData);
        setTablePagination({
          pageSize: pagination.pageSize || 15,
          totalPages: pagination.totalPages || 1,
        });
      } else {
        toast.error(res.status.message || "Something Went Wrong");
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  function fetchPaginatedData(pageNumber) {
    fetchData(name, phoneNumber, area, city, pageNumber);
  }

  async function fetchCityOptions() {
    const data = await fetchLookupData("/cities", cityFirstValue, "cities");
    setCityOptions(data);
  }

  async function fetchAreaOptions() {
    const endpoint = `/areas/${city}`;
    const data = await fetchLookupData(endpoint, areaFirstValue, "areas");
    setAreaOptions(data);
  }

  function cityOptionsChange() {
    setArea("");
    setAreaOptions([{ value: "", label: "Area" }]);
    if (city) fetchAreaOptions();
  }

  function locationClicked(location) {
    console.log("location clicked", location);
    const url = `https://www.google.com/maps?q=${location}`;
    window.open(url, "_blank");
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Repair Shops</h1>
      <div className="box-container overflow-x-auto px-6 pt-[30px] pb-10 flex flex-wrap ">
        {/* <div className="mr-4 w-1/5">
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div> */}
        <div className="mr-4 w-1/5">
          <Input
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mr-4 w-1/5">
          <Select
            options={cityOptions}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mr-4 w-1/5">
          <Select
            options={areaOptions}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        {loading && (
          <div className="mr-4 w-6 flex items-center">
            <div className="h-6 w-full">
              <Loading></Loading>
            </div>
          </div>
        )}
      </div>
      <div className="box-container mt-8 py-5 overflow-auto">
        <Table
          headers={tableHeaders}
          data={tableData}
          pagination={tablePagination}
          pageChangeFn={(e) => fetchPaginatedData(e)}
        />
      </div>
    </div>
  );
}

export default RepairShops;
