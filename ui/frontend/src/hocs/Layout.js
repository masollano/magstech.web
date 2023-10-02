import React, { Fragment } from "react";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => (
    <Fragment>
        { children }
    </Fragment>
);

export default Layout;