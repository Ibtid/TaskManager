import { FC, Fragment, useEffect, useState } from "react";
import { TaskCard } from "./TaskCard.component";
import { Spinkit } from "../../modals/index";
import { useFetchTasks } from "./Task.hooks";

export const TaskList: FC = () => {
  const { tasks, initFetchTasks, loading } = useFetchTasks();
  console.log(`TaskList component rendered ${tasks.length}`);
  useEffect(() => {
      initFetchTasks()
  }, []);

  return (
    <Fragment>
      {loading && <Spinkit />}
      <div className="text-white p-4 mt-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className=""></div>
          <div className="flex space-x-4">
          </div>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 p-4">
        {tasks.map((task, index) => (
          <TaskCard
            title={task.title}
            status={task.status}
            key={index}
            _id={task._id}
            description={task.description}
            date={task.date}
          />
        ))}
      </div>
    </Fragment>
  );
};
