import { makeStyles, SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import React from "react";

interface Props {
  pageName: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
const pageStyles = makeStyles((theme) => ({
  pageLinkWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  pageName: {
    margin: "0 auto 0 auto",
  },
}));
const Sidebarpages: React.FC<Props> = ({ pageName, Icon }) => {
  const classes = pageStyles();
  return (
    <div className={classes.pageLinkWrapper}>
      <div className="icon">
        <Icon />
      </div>
      <div className={classes.pageName}>{pageName}</div>
    </div>
  );
};

export default Sidebarpages;
