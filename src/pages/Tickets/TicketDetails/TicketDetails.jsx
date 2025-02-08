import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TicketDetails.scss";
import ProgressStepper from "../../../components/ProgressStepper/ProgressStepper";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";
import {
  paymentsHeaders,
  paymentsTableObj,
  statusEnum,
} from "../../../utils/const";
import { toast } from "react-toastify";
import { get } from "../../../utils/api";
import Loading from "../../../components/Loading/Loading";
import { formatDateTime } from "../../../utils/date";

function TicketDetails() {
  const { ticketId } = useParams();
  const [ticketDetails, setTicketDetails] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    setLoading(true);
    try {
      const res = await get(`/ticket/${ticketId}`);
      if (res.status.isSuccess) {
        const data = {
          ...res.data.ticket,
        };
        const payments = data.payments.map((payment) => ({
          ...payment,
          status: paymentsTableObj[payment.status],
          dueDate: formatDateTime(payment.dueDate),
        }));
        delete data.payments;
        setTicketDetails(data);
        setPayments(payments);
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
      <h1 className="page-header flex">Ticket {loadingComponent}</h1>

      <div className="box-container">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Status</p>
        </div>
        <div className="px-16 pt-9 pb-16">
          <ProgressStepper
            steps={statusEnum}
            currentStep={statusEnum[ticketDetails.status]}
          ></ProgressStepper>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">User Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Name"
              label="Name"
              value={ticketDetails?.user?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Phone Number"
              label="Phone Number"
              value={ticketDetails?.user?.phoneNumber}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Requested Amount"
              label="Requested Amount"
              value={ticketDetails?.requestedAmount}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Credit Amount"
              label="Credit Amount"
              value={ticketDetails?.creditAmount}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Repair Amount"
              label="Repair Amount"
              value={ticketDetails?.repairAmount}
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Request Date"
              label="Request Date"
              value={formatDateTime(ticketDetails?.requestDate) || "01-01-2025"}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Expiry Date"
              label="Expiry Date"
              value={formatDateTime(ticketDetails?.expiryDate)}
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
            <Input
              placeholder="Bank"
              label="Bank"
              value={ticketDetails?.bank?.name}
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Repair Shop</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Name"
              label="Name"
              value={ticketDetails.repairShop?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="City"
              label="City"
              value={ticketDetails.repairShop?.city?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Area"
              label="Area"
              value={ticketDetails.repairShop?.area?.name}
              disabled={true}
            ></Input>
          </div>
        </div>
      </div>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">Car Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Maker"
              label="Maker"
              value={ticketDetails.car?.maker?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Model"
              label="Model"
              value={ticketDetails.car?.model?.name}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Year"
              label="Year"
              value={ticketDetails.car?.year}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Plate Number"
              label="Plate Number"
              value={ticketDetails.car?.plateNumber}
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
            headers={paymentsHeaders}
            data={payments}
            hiddenPagination={true}
          ></Table>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;
