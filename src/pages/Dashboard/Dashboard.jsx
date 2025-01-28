import React from "react";
import Card from "../../components/card/Card";
import TotalUsersIcon from "/total-users-Icon.svg";
import TotalTicketsIcon from "/total-tickets-Icon.svg";
import TotalCreditsIcon from "/total-credits-Icon.svg";
import PieChart from "../../components/Charts/Pie/PieChart";
import AreaChart from "../../components/Charts/Area/AreaChart";

const cardData = [
  { cardName: "Total Users", data: "40,689", icon: TotalUsersIcon },
  { cardName: "Total Tickets", data: "10293", icon: TotalTicketsIcon },
  { cardName: "Total Given Credits", data: "$100,000", icon: TotalCreditsIcon },
];

function Dashboard() {
  return (
    <div className="page-container">
      <h1 className="page-header">Dashboard</h1>
      <div className="flex justify-center">
        <div className="flex justify-around w-full max-w-[1050px]">
          {cardData.map((card, index) => (
            <Card
              key={index}
              cardName={card.cardName}
              data={card.data}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 py-10  flex justify-around flex-wrap gap-6">
        <div className="box-container flex flex-col px-10 basis-[30%]">
          <h1 className="box-container-header border-none !px-0">
            Tickets count per bank
          </h1>
          <div className="flex-1 flex items-center justify-center">
            <PieChart></PieChart>
          </div>
        </div>
        <div className="box-container px-10 flex-col basis-[60%] max-[1400px]:basis-[50%]">
          <h1 className="box-container-header border-none !px-0">
            Users Growth Analysis
          </h1>
          <AreaChart></AreaChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
