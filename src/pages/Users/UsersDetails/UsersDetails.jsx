import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get } from "../../../utils/api";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { formatDateTime } from "../../../utils/date";
import { statusEnum } from "../../../utils/const";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";
import InfoIcon from "../../../../public/info.svg";

const ticketsHeaders = [
  { label: "Code", key: "code" },
  { label: "Amount", key: "amount" },
  { label: "Request Date", key: "requestDate" },
  { label: "Status", key: "status" },
  { label: "Actions", key: "actions" },
];

function UsersDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const res = await get(`/mobile-users/${userId}`);
      if (res.status.isSuccess) {
        const data = res.data.user;
        const tickets = data.tickets.map((item) => {
          item.requestDate = formatDateTime(item.requestDate);
          item.status = statusEnum[item.status];
          item.actions = {
            icon: InfoIcon,
            onClick: () => navigate(`/tickets/${item.id}`),
          };
          return item;
        });
        delete data.tickets;
        setUserDetails(data);
        setTickets(tickets);
      } else {
        toast.error(res.status.message || "Something Went Wrong");
      }
    } catch (err) {
      toast.error(`Error fetching data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadingComponent = loading && (
    <div className="mt-2 ml-3 w-7 h-7">
      <Loading></Loading>
    </div>
  );

  return (
    <div className="page-container">
      <h1 className="page-header flex">User Details {loadingComponent}</h1>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">User Information</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Name"
              label="Name"
              value={userDetails.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Email"
              label="Email"
              value={userDetails.email}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Phone Number"
              label="Phone Number"
              value={userDetails.phoneNumber}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Date of Birth"
              label="Date of Birth"
              value={formatDateTime(userDetails.dateOfBirth)}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="National ID"
              label="National ID"
              value={userDetails.nationalId}
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="City"
              label="City"
              value={userDetails.city?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Area"
              label="Area"
              value={userDetails.area?.name}
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Tickets</p>
        </div>
        <div className="mt-7 px-6">
          <Table
            headers={ticketsHeaders}
            data={tickets}
            hiddenPagination={true}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default UsersDetails;
