import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { fireStore } from "../util/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "auto",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(1)",
    cellHeight: "auto",
    cellWidth: "auto",
    width: "auto",
    height:"auto",
    padding: theme.spacing(3),
  },
  title: {
    color: theme.palette.secondary.light,
  },
  titleBar: {
    paddingTop:theme.spacing(1),
    textAlign:'center',
    height: "auto",
    background:
      "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  subtitle: {
    
    width: "auto",
    height: "auto",
  },

  avatar: {
    width:'auto',
    display: "flex",
    height: "auto",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 7,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  rating: {
    height: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
  },
  box:{
    height:"300px",
    padding:theme.spacing(10),
    display:'flex',



  },
}));

export default function SingleLineGridList() {
  const classes = useStyles();
  const [feedback, setFeedback] = useState({ Feedback: [] });

  useEffect(() => {
    fireStore.collection("Feedback List").onSnapshot(onCollectionUpdate);
  }, [feedback.Feedback]);

  const onCollectionUpdate = (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      const { Name, Email, Message, Rating, Url } = doc.data();
      data.push({
        key: doc.id,
        doc,
        Name,
        Email,
        Message,
        Rating,
        Url,
      });
    });
    setFeedback({
      Feedback: data,
    });
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="" component="h2">
        Lets hear what our students and clients told about us.
      </Typography>
      <Typography gutterBottom variant="h6" component="h2" color="textPrimary">
        Don’t just take our word for it, check out what our students are saying
        about us
      </Typography>

      <GridList className={classes.gridList} cols={3} height="auto" justify="space-around">
        {feedback.Feedback.map((value) => (
          <GridListTile key={value.key} titlePosition="center"
          >
            <div className={classes.avatar}>
              <Avatar
                alt="Remy Sharp"
                src={value.Url}
                className={classes.large}
              />
              {value.Message}
            </div>
            {/* <img src={`data:image/jpeg;base64,${value.Image}`}/> */}
            <div className={classes.rating}>
              <Rating
                name="read-only"
                defaultValue={value.Rating}
                size="large"
                readOnly
              />
            </div>

            <GridListTileBar
              titlePosition="bottom"
              title={value.Name}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
