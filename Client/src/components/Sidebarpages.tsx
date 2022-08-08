import { makeStyles, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Link, LinkProps } from "react-router-dom";
import React from "react";

interface Props extends LinkProps {
  pageName: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  // destination?: string;
}
const pageStyles = makeStyles((theme) => ({
  pageLinkWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "1.4rem",
    cursor: "pointer",
    height: "80px",

    // justifyContent:'space-evenly'
  },
  pageName: {
    // margin: "0 auto 0 auto",
  },
}));
const Sidebarpages: React.FC<Props> = ({ pageName, Icon, ...destination }) => {
  const classes = pageStyles();
  return (
    <Link style={{ textDecoration: "none", color: "black" }} {...destination}>
      <div className={classes.pageLinkWrapper}>
        <div className="icon">
          <Icon />
        </div>
        <div className={classes.pageName}>{pageName}</div>
      </div>
    </Link>
  );
};

export default Sidebarpages;
