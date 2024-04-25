import React from "react";
import "./ConfirmationCard.css";

interface IConfirmationCardProps {
  taskName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationCardModal: React.FC<IConfirmationCardProps> = ({
  taskName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="confirmation_card">
      <div className="p-4 bg-white shadow-md rounded-md">
        <div className="mb-4 text-2xl">
          Are you sure you want to delete the task {taskName}?
        </div>
        <div className="flex">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

// export default ConfirmationCardModal;
