import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div
      className="d-flex align-items-center justify-content-center container"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className={classes.root}>
        <LinearProgress />
      </div>
    </div>
  );
}
