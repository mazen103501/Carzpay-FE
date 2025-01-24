import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Table from "../../../components/Table/Table";
import { get } from "../../../utils/api";
import { toast } from "react-toastify";
import {
  paidEnum,
  paymentsHeaders,
  paymentsTableObj,
} from "../../../utils/const";
import Loading from "../../../components/Loading/Loading";

function RepairShopDetails() {
  const { shopId } = useParams();
  const [shopDetails, setShopDetails] = useState({});
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    setLoading(true);
    try {
      const res = await get(`/repair-shop/${shopId}`);
      if (res.status.isSuccess) {
        const data = {
          ...res.data.repairShop,
          area: res.data.repairShop.area.name,
          city: res.data.repairShop.city.name,
        };
        const payments = data.payments.map((payment) => ({
          ...payment,
          status: paymentsTableObj[payment.status],
          dueDate: "01-01-2025",
        }));
        delete data.payments;
        setShopDetails(data);
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

  const filteredPayments = payments.filter((payment) => {
    if (activeButton === null) return true;
    return payment.status.data === activeButton;
  });

  const loadingComponent = loading && (
    <div className="mt-2 ml-3 w-7 h-7">
      <Loading></Loading>
    </div>
  );

  return (
    <div className="page-container">
      <h1 className="page-header flex">Repair Shop {loadingComponent}</h1>

      <div className="box-container mt-7">
        <div className="box-container-header">
          <p className="text-2xl font-bold">User Details</p>
        </div>
        <div className="p-5 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Arabic Name"
              label="Arabic Name"
              value={shopDetails.arabicName}
              cssClasses="text-rtl text-left"
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="English Name"
              label="English Name"
              value={shopDetails.englishName}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Phone Number"
              label="Phone Number"
              value={shopDetails.phoneNumber}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="whatsapp Phone Number"
              label="whatsapp Phone Number"
              value={shopDetails.whatsappPhoneNumber}
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="px-5 py-3 flex flex-wrap gap-5">
          <div className="w-full min-w-[220px] ">
            <Input
              placeholder="Arabic Description"
              label="Arabic Description"
              value={shopDetails.arabicDescription}
              cssClasses="text-rtl text-left"
              disabled={true}
            ></Input>
          </div>
          <div className="w-full min-w-[220px]">
            <Input
              placeholder="English Description"
              label="English Description"
              value={shopDetails.englishDescription}
              disabled={true}
            ></Input>
          </div>
        </div>
        <div className="p-5 pt-3 flex flex-wrap gap-5">
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="City"
              label="City"
              value={shopDetails.city}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Area"
              label="Area"
              value={shopDetails.area}
              disabled={true}
            ></Input>
          </div>
          <div className="w-1/5 min-w-[220px]">
            <Input
              placeholder="Location"
              label="Lat/Long"
              value={shopDetails.location}
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
                activeButton === null
                  ? "text-white bg-primary"
                  : "text-primary bg-[#F1F1F1]"
              }`}
              onClick={() => setActiveButton(null)}
            >
              All
            </button>
            <button
              className={`font-semibold  px-9 py-2 rounded-xl mr-4 ${
                activeButton === paidEnum.paid
                  ? "text-white bg-primary"
                  : "text-primary bg-[#F1F1F1]"
              }`}
              onClick={() => setActiveButton(paidEnum.paid)}
            >
              Paid
            </button>
            <button
              className={`font-semibold  px-9 py-2 rounded-xl ${
                activeButton === paidEnum.unPaid
                  ? "text-white bg-primary"
                  : "text-primary bg-[#F1F1F1]"
              }`}
              onClick={() => setActiveButton(paidEnum.unPaid)}
            >
              Unpaid
            </button>
          </div>
          <div className="mt-8">
            <Table
              headers={paymentsHeaders}
              data={filteredPayments}
              hiddenPagination={true}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RepairShopDetails;
