import React from "react";
import VetCoursePage from "./vetCoursePage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function Plumbing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VetCoursePage
        Title={"Plumbing"}
        Image={
          "http://www.didyouknow.it/wp-content/uploads/2017/11/Miami-Plumbing-Service.jpg"
        }
      />
    </div>
  );
}
