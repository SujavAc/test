import React from "react";
import VetCoursePage from "./vetCoursePage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));
export default function Painting() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VetCoursePage
        Title={"Painting & Decoration"}
        Image={
          "https://ae01.alicdn.com/kf/HTB1RuFJflfM8KJjSZFOq6xr5XXaS/Canvas-Painting-Living-Room-Decor-3-Pieces-Blue-Peacock-Pictures-HD-Prints-Orchid-Flower-Butterflies-Poster.jpg"
        }
      />
    </div>
  );
}
