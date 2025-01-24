export const paidEnum = {
  unPaid: "Un Paid",
  paid: "Paid",
};

export const paymentsHeaders = [
  { label: "Amount", key: "amount" },
  { label: "Due Date", key: "dueDate" },
  { label: "Status", key: "status" },
];

export const paymentsTableObj = [
  {
    data: paidEnum.paid,
    styles: "rounded-[4.5px] max-w-[110px] status approved",
  },
  {
    data: paidEnum.unPaid,
    styles: "rounded-[4.5px] max-w-[110px] status rejected",
  },
];

export const statusEnum = [
  "Initiated",
  "Approved",
  "Rejected",
  "In Repair",
  "Repaired",
  "Pending Installment",
  "Settled",
];
