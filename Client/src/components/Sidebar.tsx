import { makeStyles, Avatar } from "@material-ui/core";
import {
  Dashboard,
  PersonOutline,
  Museum,
  Notifications,
  CloseRounded,
} from "@material-ui/icons";
import Sidebarpages from "./Sidebarpages";
import React from "react";
const sidebarStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "100%",
  },
  userDetails: {
    margin: theme.spacing(0, 0, 0, 2),

    display: "flex",
    alignItems: "center",
    gap: "2rem",
    minHeight: "14vh",
    width: "100%",
  },
  accountinfo: {},
  pages: {
    width: "100%",
    height: "100%",
  },
  page_container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    // justifyContent: "space-evenly",
    margin: theme.spacing(0, 0, 0, 2),
  },
}));
function Sidebar() {
  const classes = sidebarStyles();
  return (
    <div className={classes.container}>
      <div className={classes.userDetails}>
        <Avatar />
        <div className="username">
          <div className="name">Stephen</div>
          <div className="sub">Williams</div>
        </div>
      </div>
      <div className={classes.accountinfo}></div>
      <div className={classes.pages}>
        <div className={classes.page_container}>
          <Sidebarpages pageName="Dashboard" Icon={Dashboard} />
          <Sidebarpages pageName="My Accounts" Icon={PersonOutline} />
          <Sidebarpages pageName="Bank Account" Icon={Museum} />
          <Sidebarpages pageName="Notifications" Icon={Notifications} />
          <Sidebarpages pageName="Log out" Icon={CloseRounded} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
