import React from "react";
import "./ProgressStepper.scss";

const stepss = [
  "Initiated",
  "Approved",
  "In Repair",
  "Repaired",
  "Pending Installments",
  "Settled",
];
function ProgressStepper({ steps, currentStep = "Approved" }) {
  const activeStep = stepss.indexOf(currentStep);
  console.log(activeStep);
  return (
    <div className="progress-stepper">
      {stepss.map((step, index) => (
        <div key={index} className={index <= activeStep ? "active" : ""}>
          <div>
            <div>{step}</div>
          </div>
          <span></span>
        </div>
      ))}
      {/* <div className="active">
        <div>
          <div>test</div>
        </div>
        <span></span>
      </div>
      <div>
        <div>
          <div>Report</div>
        </div>
        <span></span>
      </div>
      <div>
        <div>
          <div>Report</div>
        </div>
        <span></span>
      </div>
      <div>
        <div>
          <div>Report</div>
        </div>
        <span></span>
      </div>
      <div>
        <div>
          <div>Report</div>
        </div>
        <span></span>
      </div>
      <div>
        <div>
          <div>Report</div>
        </div>
        <span></span>
      </div> */}
    </div>
  );
}

export default ProgressStepper;
