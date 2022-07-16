import { makeStyles, Avatar } from "@material-ui/core";
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
  },
  accountinfo: {},
  pages: {},
  page_container: {
    display: "flex",
    justifyContent: "space-between",
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
        <div className={classes.page_container}></div>
      </div>
    </div>
  );
}

export default Sidebar;
