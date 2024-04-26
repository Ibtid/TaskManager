import { FC, Fragment, useEffect, useState } from "react";
import calender from "../../img/calender.svg";
import StatusComponent from "../common/status/Status.component";
import { ITaskCardProps } from "../../interfaces/task";
import { ConfirmationCardModal, Spinkit } from "../../modals";

import {useTaskApi} from "../../hooks/tasks/useTaskApi";
import Button from "../common/buttons/button";
import deleteIcon from "../../img/delete.svg";
import { formatDate } from "../../util/formatDate";

export const TaskCard: FC<ITaskCardProps> = ({
  _id,
  title,
  description,
  status,
  date,
}) => {
  const [showModal, setShowModal] = useState<Boolean>(false);

  const { loading, error, deleteSelectedTask, updateSelectedTask } = useTaskApi();

  const confirmDelete = async () => {
    await deleteSelectedTask(_id);
    setShowModal(false);
  };

  useEffect(() => {
    const currentDate = Date.now();
    const dateObject = new Date(date); 
    const timeDifference = dateObject.getTime() - currentDate;

    if (timeDifference > 0) {
      const timer = setTimeout(() => {
        updateSelectedTask(_id);
      }, timeDifference);

      return () => {
        clearTimeout(timer); 
      };
    } else if (status == "not_started") updateSelectedTask(_id);
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

