import React, { FC, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UiPaths from "../../../paths/uiPaths";
import { Outlet, Link } from "react-router-dom";
import Button from "../buttons/button";
import addIcon from "../../../img/add.svg";
import back from "../../../img/back.svg"

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <Fragment>
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Task Manager</div>
          <div className="flex space-x-4">
            {pathname == "/list" ? (
              <Button
                onClick={() => navigate(UiPaths.AddTask)}
                label="Add Task"
                iconSrc={addIcon}
                smMarginRight={true}
                bgColor="bg-gray-800"
                hoverBgColor="hover:bg-blue-700"
              />
            ) : (
              <Button
                onClick={() => navigate(UiPaths.TasksList)}
                label="Back"
                iconSrc={back}
                smMarginRight={true}
                bgColor="bg-gray-800"
                hoverBgColor="hover:bg-blue-700"
              />
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Navbar;
