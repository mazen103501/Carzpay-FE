import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import Select from "../../components/Select/Select";
import Table from "../../components/Table/Table";
import InfoIcon from "../../../public/info.svg";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { post } from "../../utils/api";
import { statusEnum } from "../../utils/const";
import { fetchLookupData } from "../../utils/fetchLookup";
import { formatDateTime } from "../../utils/date";

const bankFirstValue = { value: "", label: "Bank" };

const statusFirstValue = { value: "", label: "Status" };

const tableHeaders = [
  { label: "Code", key: "code" },
  { label: "Name", key: "name" },
  { label: "Phone Number", key: "phoneNumber" },
  { label: "Approved Amount", key: "approvedAmount" },
  { label: "Request Date", key: "requestDate" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

function Tickets() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bank, setBank] = useState("");
  const [status, setStatus] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tablePagination, setTablePagination] = useState({
    pageSize: 15,
    totalPages: 3,
  });
  const [loading, setLoading] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(false);
  const [bankOptions, setBankOptions] = useState([bankFirstValue]);
  const [statusOptions, setStatusOptions] = useState([statusFirstValue]);

  useEffect(() => {
    if (isInitialMount) {
      const timer = setTimeout(() => {
        fetchPaginatedData(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (isInitialMount) {
      fetchPaginatedData(1);
    }
  }, [bank, status]);

  useEffect(() => {
    fetchPaginatedData(1);
    fetchBankOptions();
    fetchStatusesOptions();
    setIsInitialMount(true);
  }, []);

  function fetchPaginatedData(pageNumber) {
    fetchData(phoneNumber, bank, status, pageNumber);
  }

  const fetchData = async (phoneNumber, bank, status, pageNumber) => {
    setLoading(true);

    const payload = { pageNumber };
    if (phoneNumber) payload.phoneNumber = phoneNumber;
    if (bank) payload.bank = +bank;
    if (status) payload.status = +status;

    try {
      const res = await post("/ticket/search", payload);
      if (res.status.isSuccess) {
        const pagination = res.pagination;
        const tableData = res.data.tickets.map((item) => {
          item.name = item.user.name;
          item.phoneNumber = item.user.phoneNumber;
          item.approvedAmount = item.creditAmount;
          item.requestDate = formatDateTime(item.requestDate) || "01-01-2025";
          item.status = {
            data: statusEnum[item.status],
            styles: "status w-fit whitespace-nowrap !max-w-none approved",
          };
          item.actions = {
            icon: InfoIcon,
            onClick: () => navigate(`/tickets/${item.id}`),
          };
          delete item.user;
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

  async function fetchBankOptions() {
    const data = await fetchLookupData("/banks", bankFirstValue, "banks");
    setBankOptions(data);
  }

  async function fetchStatusesOptions() {
    const data = await fetchLookupData(
      "/ticket/statuses",
      statusFirstValue,
      "statuses"
    );
    setStatusOptions(data);
  }

  return (
    <div className="page-container">
      <h1 className="page-header">Tickets</h1>
      <div className="box-container overflow-x-auto px-6 pt-[30px] pb-10 flex flex-wrap ">
        <div className="mr-2 w-1/4">
          <Input
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mr-2 w-1/4">
          <Select
            options={bankOptions}
            onChange={(e) => setBank(e.target.value)}
          />
        </div>
        <div className="mr-2 w-1/4">
          <Select
            options={statusOptions}
            onChange={(e) => setStatus(e.target.value)}
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

export default Tickets;
