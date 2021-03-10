import React from "react";
import VetCoursePage from "./vetCoursePage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function CommunityService() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VetCoursePage
        Title={"Community Services"}
        Image={
          "https://www.stpaulsmobile.net/image/1-future-saints/about/community-service-image-2017.jpg"
        }
      />
    </div>
  );
}
