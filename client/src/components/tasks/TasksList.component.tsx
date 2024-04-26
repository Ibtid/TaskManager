import { FC, Fragment, useEffect } from "react";
import { TaskCard } from "./TaskCard.component";
import { Spinkit } from "../../modals/index";
import { useTaskApi } from "../../hooks/tasks/useTaskApi";


export const TaskList: FC = () => {
  const { tasks, fetchAllTasks, loading } = useTaskApi();
  
  useEffect(() => {
      fetchAllTasks()
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
      <div className="container mx-auto grid grid-cols-1 gap-12 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 p-4">
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
        {tasks.length === 0 && <div>No tasks found</div>}
      </div>
    </Fragment>
  );
};
