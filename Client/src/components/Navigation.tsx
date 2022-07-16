import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import { Menu, Notifications } from "@material-ui/icons";
import SvgRwaLogo from "./SvgLogo";
const navstyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.primary.main,
    padding: theme.spacing(3, 3, 0, 3),
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  accordion: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    gap: "2rem",
    fontSize: "1.3rem",
    color: "white",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    gap: ".2rem",
  },
}));
function Navigation() {
  const classes = navstyles();
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Menu style={{ color: "white" }} />
        <div className="logo">
          <div className="logo_image">
            <SvgRwaLogo style={{ color: "white" }} />
          </div>
        </div>
        <div className={classes.notification}>
          <Button variant="contained" color="secondary">
            New
          </Button>
          <Notifications style={{ color: "white" }} />
        </div>
      </div>
      <div className={classes.accordion}>
        <div>Everyone</div>
        <div>Friends</div>
        <div>Mine</div>
      </div>
    </div>
  );
}

export default Navigation;
