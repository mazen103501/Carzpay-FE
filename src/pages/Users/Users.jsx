import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Table from "../../components/Table/Table";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { post } from "../../utils/api";
import { toast } from "react-toastify";
import { formatDateTime } from "../../utils/date";
import InfoIcon from "../../../public/info.svg";

const tableHeaders = [
  { label: "Name", key: "name" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Email", key: "email" },
  { label: "Register Date", key: "registerDate" },
  { label: "Actions", key: "actions" },
];

function Users() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tablePagination, setTablePagination] = useState({
    pageSize: 15,
    totalPages: 3,
  });
  const [loading, setLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(false);

  useEffect(() => {
    if (isInitialMount) {
      const timer = setTimeout(() => {
        fetchPaginatedData(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [name, phoneNumber]);

  useEffect(() => {
    fetchPaginatedData(1);
    setIsInitialMount(true);
  }, []);

  function fetchPaginatedData(pageNumber) {
    fetchData(name, phoneNumber, pageNumber);
  }

  const fetchData = async (name, phoneNumber, pageNumber) => {
    setLoading(true);
    console.log("fetching data");
    const payload = { pageNumber };
    if (name) payload.name = name;
    if (phoneNumber) payload.phoneNumber = phoneNumber;

    try {
      const res = await post("/mobile-users/search", payload);
      if (res.status.isSuccess) {
        const pagination = res.pagination;
        const tableData = res.data.users.map((item) => {
          item.registerDate =
            (item.registerDate && formatDateTime(item.registerDate)) || "";
          item.actions = {
            icon: InfoIcon,
            onClick: () => navigate(`/users/${item.id}`),
          };
          return item;
        });
        setTablePagination({
          pageSize: pagination.pageSize || 15,
          totalPages: pagination.totalPages || 1,
        });
        setTableData(tableData);
      } else {
        toast.error(res.status.message || "Something Went Wrong");
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-header">Users</h1>
      <div className="box-container overflow-x-auto px-6 pt-[30px] pb-10 flex flex-wrap ">
        <div className="mr-2 w-1/4">
          <Input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mr-2 w-1/4">
          <Input
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
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

export default Users;
