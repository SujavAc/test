import React from "react";
import VetCoursePage from "./vetCoursePage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function AgeCare() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VetCoursePage
        Title={"Age Care"}
        Image={
          "https://insightplus.mja.com.au/wp-content/uploads/2020/08/aged-care-new-model-deals-with-issues-spotlighted-by-covid-19-294.jpg"
        }
      />
    </div>
  );
}
