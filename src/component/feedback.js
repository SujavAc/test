import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Axios from "axios";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.secondary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  subtitle: {
    width: "auto",
    height: "auto",
  },

  avatar: {
    display: "flex",
    flexDirection: "rows",
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
    flexDirection: "rows",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
  },
}));

export default function SingleLineGridList() {
  const classes = useStyles();
  const [feedback, setFeedback] = useState({ Feedback: [] });

  useEffect(() => {
    Axios.post(
      "http://172.26.34.83:81/Webandy/webandy/src/database/getFeedback.php"
    )
      .then((response) => {
        setFeedback({ Feedback: response.data });
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={classes.root}>
      <Typography gutterBottom variant="h7" component="h2">
        Lets hear what our students and clients told about us.
      </Typography>
      <Typography gutterBottom variant="h6" component="h2" color="textPrimary">
        Don’t just take our word for it, check out what our students are saying
        about us
      </Typography>
      <GridList className={classes.gridList} cols={2.5} justify="space-around">
        {feedback.Feedback.map((value) => (
          <GridListTile key={value.ID}>
            <div className={classes.avatar}>
              <Avatar
                alt="Remy Sharp"
                src={`data:image/jpeg;base64,${value.Image}`}
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
              {value.Date}
            </div>

            <GridListTileBar
              titlePosition="bottom"
              title={value.Email}
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
