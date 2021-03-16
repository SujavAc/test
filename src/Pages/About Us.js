import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import NavBarApp from "../component/navbar";
//import Map from "../component/Map/map";
import EnquiryForm from "../component/enquiryform";
import Footer from "../component/footer";
import Form from "../component/Form/openform";
import FeedBack from "../component/feedback";
import Expert from "../image/advice.jpg";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      height: theme.spacing(18),
    },
    flexGrow: 1,
    padding:theme.spacing(1),
  },
  paper: {
    height: "auto",
    padding: theme.spacing(1),
    width: "auto",
  },
  Contact: {

    padding: theme.spacing(1),
    width: "auto",
    margin: 10,
    background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },

  form: {
    height: "auto",
    padding: theme.spacing(4),
    margin: 25,
    width: "auto",

    backgroundImage: "url(" + Expert + ")",
    backgroundSize: "cover",
  },
}));

export default function AboutUs() {
  const classes = useStyles();
  //const API_KEY = 'AIzaSyAw8IaQy2dgR_EgvAPAlM7K1V1iSmJJ_3A';

  return (
    <div className={classes.root}>
      <NavBarApp />
      <Paper elevation={5} className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs container direction="rows" spacing={3}>
          <Grid item xs={6}>
            <Typography variant="body2" gutterBottom paragraph>
              Roger Educational Services is a leading education consultancy
              founded in 2008 with global footprint in 12 countries and 33
              cities. Our motive is to provide expert international education
              guidance and counseling to passionate students. We have a
              dedicated team of richly experienced and certified professionals
              to help students in choosing the best courses that are available
              in international universities across worldwide renowned study
              destinations like Australia, Canada, Singapore, Malaysia, Ireland,
              New Zealand, UK and USA.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Paper>
      <Paper elevation={5} className={classes.Contact}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Contact Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Phone Number: 042443243
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Address: "djgfsdhfjg"
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">Technical Support</Typography>
                <Typography variant="body2" gutterBottom>
                  Email: support@roger.com
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">General Enquiries</Typography>
                <Typography variant="body2" gutterBottom>
                  Email: andy@rogergroup.com.au
                </Typography>
                <EnquiryForm />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {/* <Paper elevation={5} className={classes.paper}>
        <Map />
      </Paper> */}
      <Paper elevation={5} className={classes.paper}>
        <FeedBack />
      </Paper>

      <Paper elevation={5} className={classes.form}>
        <Form />
      </Paper>

      <Footer />
    </div>
  );
}
