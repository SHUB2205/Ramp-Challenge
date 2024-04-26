import { useState } from "react";
import { InputCheckbox } from "../InputCheckbox";
import { TransactionPaneComponent } from "./types";

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval
}) => {
  const [approved, setApproved] = useState<boolean>(transaction.approved);

  const handleApprovalChange = (newApprovedValue: boolean) => {
    setApproved(newApprovedValue);  // Update local state to reflect the new checkbox status
    setTransactionApproval({
      transactionId: transaction.id,
      newValue: newApprovedValue  // Correct property name as per index.tsx
    });
  };

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant}</p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} -{" "}
          {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={handleApprovalChange}
      />
    </div>
  );
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});