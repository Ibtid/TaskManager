import { FC, Fragment, useEffect, useState } from "react";
import calender from "../../img/calender.svg";
import UiPaths from "../../paths/uiPaths";
import { useNavigate } from "react-router-dom";
import StatusComponent from "../common/status/Status.component";
import { ITask, ITaskCardProps } from "../../interfaces/task";
import { useDispatch } from "react-redux";
import { deleteTodo, selectTask, selectedTask } from "../../todosSlice";
import { useSelector } from "react-redux";
import { ConfirmationCardModal, Spinkit } from "../../modals";

import { useDeleteTasks, useUpdateTasks } from "./Task.hooks";
import Button from "../common/buttons/button";
import deleteIcon from "../../img/delete.svg";

export const TaskCard: FC<ITaskCardProps> = ({
  _id,
  title,
  description,
  status,
  date,
}) => {
  const [showModal, setShowModal] = useState<Boolean>(false);

  const { loading, error, initDeleteTasks } = useDeleteTasks();
  const { initUpdateTasks } = useUpdateTasks();

  const confirmDelete = async () => {
    await initDeleteTasks(_id);
    setShowModal(false);
  };

  useEffect(() => {
    const currentDate = Date.now();
    const dateObject = new Date(date); // Create a Date object from the string date
    const timeDifference = dateObject.getTime() - currentDate; // Difference in milliseconds

    if (timeDifference > 0) {
      const timer = setTimeout(() => {
        initUpdateTasks(_id);
      }, timeDifference);

      return () => {
        clearTimeout(timer); // Clear the timer if the component unmounts before the timeout
      };
    } else if (status == "not_started") initUpdateTasks(_id);
  }, []);

  return (
    <Fragment>
      {loading && <Spinkit />}
      {showModal && (
        <ConfirmationCardModal
          taskName={title}
          onConfirm={() => {
            confirmDelete();
          }}
          onCancel={() => {
            setShowModal(false);
          }}
        />
      )}
      <div className="flex flex-col justify-between bg-slate-50 p-6 rounded-lg shadow-md max-w-lg mx-auto sm:max-w-xl lg:max-w-2xl xl:max-w-3xl w-72 md:w-80 lg:w-96">
        <div className="flex flex-col items-center justify-between mb-6">
          <div className="text-2xl lg:text-2xl font-semibold mb-4">
            {title}
          </div>
          <div className="flex items-center text-xs md:text-sm">
            <div className="bg-gray-200 pt-1 pb-1 pr-2 pl-2 text rounded-l-md flex items-center">
              <img
                src={calender}
                alt="calender"
                className="inline h-4 w-4 sm:h-5 sm:w-5 md:mr-1"
              />
              <div className="hidden md:inline">Due</div>
            </div>
            <div className="bg-gray-100 pt-1 pb-1 pr-2 pl-2 rounded-r-md">
              {formatDate(new Date(date))}
            </div>
          </div>
        </div>
        <div className="text-gray-700 mb-8 text-md md:text-lg">
          {description}
        </div>
        <div className="flex flex-row items-center justify-between">
          <StatusComponent status={status} />
          <Button
            onClick={() => {
              setShowModal(true);
            }}
            label="Delete"
            iconSrc={deleteIcon}
            bgColor="bg-red-500"
            hoverBgColor="hover:bg-red-600"
            smMarginRight={true}
          />
        </div>
      </div>
    </Fragment>
  );
};

function formatDate(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${amOrPm} ${month} ${day}, ${year}`;
}
