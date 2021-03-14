import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Page from "./pages";
import { fireStore } from "../util/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    // padding: theme.spacing(2),
  },
  media: {
    height: 400,
    width: 450,
  },
}));

export default function PCourse() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Page
        Title={"Welcome To Popular Courses"}
        image1={"https://i.redd.it/1vemqfhuf9u41.jpg"}
        pT2={"Become anything you can imagine"}
        p2={
          "When you’re building your future, it’s good to have options. Wherever you are in this journey, from a recent school graduate right through to a professional who’s looking for a new challenge, we can help you find a course to study at one of over 300 of the world’s leading institutions and universities that we represent. Whether you’re dreaming of a career as a journalist, documenting big events around the world, an engineer working on the latest space shuttle, or a social worker helping people in your own community, the best place to start is with an advice from AECC Global."
        }
        image2={
          "https://ih0.redbubble.net/image.8712023.7976/flat,1000x1000,075,f.jpg"
        }
        pT3={"We’ll get you where you want to go"}
        p3={
          "Living and studying overseas can be confusing and complex. But at AECC Global, we are on a mission to make International Education accessible. Many of our team members have been international students themselves and we have the empathy and experience to get you started on your exciting journey. We’ve done the hard work for you, and have formed trusted partnerships with leading universities, colleges and institutions so that we can always provide the best advice for all our students. With that comes intimate knowledge about courses, teaching methodology and cultural nuances that all go into our advice to you."
        }
        PopularCourseContainer={'Course Details'}
      />
    </div>
  );
}
