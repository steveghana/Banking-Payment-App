import { makeStyles, Avatar } from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
import Sidebarpages from "./Sidebarpages";
import React from "react";
const sidebarStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userDetails: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    minHeight: "15vh",
    width: "100%",
  },
  accountinfo: {},
  pages: {
    width: "100%",
  },
  page_container: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(8, 0, 0, 2),
    background: "red",
  },
}));
function Sidebar() {
  const classes = sidebarStyles();
  return (
    <div className={classes.container}>
      <div className={classes.userDetails}>
        <Avatar />
        <div className="name">Stephen</div>
        <div className="sub">Williams</div>
      </div>
      <div className={classes.accountinfo}></div>
      <div className={classes.pages}>
        <div className={classes.page_container}>
          <Sidebarpages pageName="Dashboard" Icon={Dashboard} />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
