import React from "react";
import "./ProgressStepper.scss";

const stepsWithoutReject = [
  "Initiated",
  "Approved",
  "In Repair",
  "Repaired",
  "Pending Installments",
  "Settled",
];
function ProgressStepper({ steps, currentStep }) {
  const activeStep = stepsWithoutReject.indexOf(currentStep);
  return (
    <div className="progress-stepper">
      {stepsWithoutReject.map((step, index) => (
        <div key={index} className={index <= activeStep ? "active" : ""}>
          <div>
            <div>{step}</div>
          </div>
          <span></span>
        </div>
      ))}
    </div>
  );
}

export default ProgressStepper;
