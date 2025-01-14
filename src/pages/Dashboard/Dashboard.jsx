import React from "react";
import Card from "../../components/card/Card";
import TotalUsersIcon from "/total-users-Icon.svg";
import TotalTicketsIcon from "/total-tickets-Icon.svg";
import TotalCreditsIcon from "/total-credits-Icon.svg";

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
    </div>
  );
}

export default Dashboard;
