import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Image from "react-image-file";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { fireStore } from "../util/firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1),
    padding: theme.spacing(2),
  },
  media: {

    [theme.breakpoints.up("sm")]: {
        height: 200,
        width: 450,
    },
    [theme.breakpoints.down("xs")]: {
        width: 150,
        height: 100,
    },
    [theme.breakpoints.up("md")]: {
        width: 710,
        height: 400,
    },
    
    
  },
}));

export default function PCourse() {
  const classes = useStyles();
  const [courseList, setCourseList] = useState({ course: [] });
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fireStore.collection("Popular Course").onSnapshot(onCollectionUpdate);
  }, []);
  //console.log(courseList);

  const onCollectionUpdate = (querySnapshot) => {
    const popularCourse = [];
    querySnapshot.forEach((doc) => {
      const {
        Title,
        Url,
        Description,
        Moreinfo,
        FeeStructure,
        PRpathway,
      } = doc.data();
      popularCourse.push({
        key: doc.id,
        doc,
        Title,
        Url,
        Description,
        Moreinfo,
        FeeStructure,
        PRpathway,
      });
    });
    setCourseList({
      course: popularCourse,
    });
    setLoading(false);
  };

  return (
    <div className={classes.root}>
      
        {loading ? (
          <Grid container spacing={3}>
          <LinearProgress />
          </Grid>
        ) : courseList.course === 0 ? (
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Image src="https://il5.picdn.net/shutterstock/videos/6705676/thumb/10.jpg?i10c=img.resize(height:160)" />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Error Occured
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {courseList.course.map((value, index) => {
              return (
                <Grid item xs={6}>
                  <Card key={value.key}>
                    {/* <Image src={value.Url} /> */}

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

                    <CardActions>
                      <Link to={value.Title}>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      
    </div>
  );
}
