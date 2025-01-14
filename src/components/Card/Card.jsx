import React from "react";

function Card({ cardName, data, icon }) {
  return (
    <div className="box-container gap-16 flex px-4 pt-4 pb-7">
      <div>
        <h3 className="text-darkGray font-semibold opacity-70 mb-4">
          {cardName}
        </h3>
        <p className="text-3xl font-bold nunito-font">{data}</p>
      </div>
      <div>
        <img src={icon} alt="icon" />
      </div>
    </div>
  );
}

export default Card;
