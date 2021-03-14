import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "react-image-file";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import { fireStore } from "../util/firebase";
import { Grid } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media: {
    height: 300,
    width: 300,
  },
 
  
}));

export default function MediaCard() {
  const classes = useStyles();
  const [contentData, setContentData] = useState({ data: [] });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fireStore.collection("Vet and Trade course").onSnapshot(onCollectionUpdate);
  }, [contentData.data]);

  const onCollectionUpdate = (querySnapshot) => {
    const Data = [];
    querySnapshot.forEach((doc) => {
      const { Title, Description, Url } = doc.data();
      Data.push({
        key: doc.id,
        doc,
        Title,
        Description,
        Url,
      });
    });
    setContentData({
      data: Data,
    });
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={5} className={classes.paper}>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              style={{ textAlign: "center" }}
            >
              <b> How Rodger Educational Services can help students.</b>
              <br></br>
              FInd out more about our company services, and other provided
              facilities.
            </Typography>
          </Paper>
        </Grid>

        {loading ? (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        ) : contentData.data === 0 ? (
          
            <Grid item xs={12}>
              <Card>
                <Typography gutterBottom variant="h6" component="h2">
                  <p>
                    <b>There are no Vet course banner.</b>
                  </p>
                </Typography>
              </Card>
            </Grid>
          
        ) : (
          <div  >
             <Grid container spacing={3}>
            {contentData.data.map((value, index) => {
              return (
                
                <Grid item xs={6}> 
                  <Card key={value.Key}>
                    <Image src={value.Url} />
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        title="Sujav"
                        image={value.Url}
                      />

                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {value.Title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {value.Description}
                          <br></br>
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      <NavLink to={value.Title}>
                        <Button variant="contained" color="primary">
                          Learn More
                        </Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                  <br></br>
                </Grid>
                
              );
            })}
            </Grid>
          </div>
        )}
      </Grid>
    </div>
  );
}
