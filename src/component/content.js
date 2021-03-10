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
import Axios from "axios";
import Paper from "@material-ui/core/Paper";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:theme.spacing(1),
  },
  paper: {
    
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  media:{
    height:400,
    width:400,
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const [contentData, setContentData] = useState({ data: [] });

  useEffect(() => {
    Axios.post("http://172.26.34.83:81/Webandy/webandy/src/database/get.php")
      .then((response) => {
        setContentData({ data: response.data });
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(contentData);

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
        
          {contentData.data.map((value, index) => {
            const image = value.Picture;
            return (
              <Grid item xs={6}>
              
                <Card  key={index.ID}>
                  <Image
                    src={{ uri: `data:image/jpeg;base64,${value.Picture}` }}
                  />
                  <CardActionArea key={index.ID}>
                    <CardMedia
                      key={index.ID}
                      className={classes.media}
                      title="Sujav"
                      image={`data:image/jpeg;base64,${image}`}
                    />
                    {/* <img src={`data:image/jpeg;base64,${image}`}/> */}

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
                
        </Grid>
            );
          })}
          
      </Grid>
    </div>
  );
}
