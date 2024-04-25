import {FC, Fragment} from 'react';
import { TaskList } from '../components/tasks';

const TasksPage:FC = () => {
  return <Fragment>
    <TaskList/>
  </Fragment>;
};

export default TasksPage