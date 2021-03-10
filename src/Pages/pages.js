import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import NavBarApp from "../component/navbar";
import Feedback from "../component/feedback";
import Form from "../component/Form/openform";
import Expert from "../image/advice.jpg";
import Footer from "../component/footer";
import ExpertForm from './form';
import FeedBackForm from '../component/feedbackform/form';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      height: theme.spacing(16),
    },
    flexGrow: 1,
    width: "auto",
    height: "auto",
  },
  paper: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
  },

  feedback: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
    justifyContent:'center',
    alignItems:'center',
    //background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },
  feedbackform: {
    height: "auto",
    width: "auto",
    justifyContent:'center',
    alignItems:'center',
    //background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },
  formPaper: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
    backgroundImage: "url(" + Expert + ")",
    backgroundSize: "cover",
  },
  services:{
    height: "auto",
    width: "auto",
    display:'flex',
    padding:theme.spacing(2),
    
  },
  title: {
    height: "auto",
    padding: theme.spacing(5),
    width: "auto",
    margin: 25,
    background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    
    margin: 25,
    // backgroundImage: "url(" + Expert + ")",
    // backgroundSize: "cover",
    
    width:'auto',
    height:'auto',
    [theme.breakpoints.up('sm')]: {
      width:'auto',
    height:'auto',
    }
  },
  card: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
   
    
  },
  service:{
    flexGrow:1,
  },
  media: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9,
    // marginTop:'30'
  },
}));

export default function Pages(props) {
  const img1 = props.image1;
  const img2 = props.image2;
  const img3 = props.image3;
  const img4 = props.image4;
  const img5 = props.image5;
  const classes = useStyles();
  //const API_KEY = 'AIzaSyAw8IaQy2dgR_EgvAPAlM7K1V1iSmJJ_3A';

  return (
    <div className={classes.root}>
      <NavBarApp />
      <Paper elevation={5} className={classes.title}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h3">
            {props.Title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h3" color="textPrimary">
            {props.Title1}
          </Typography>
          <Typography gutterBottom variant="h6" component="h6" color="textSecondary">
            {props.Title2}
          </Typography>
          <ExpertForm Title={'Get Your Free Counselling'}/>
          
        </CardContent>
      </Paper>

      <Paper elevation={5} className={classes.image}>
        <Card>
          <CardActionArea >
            <CardMedia
              component="img"
              
              height="640"
              image={img1}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.pT2}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.p2}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>

      <Paper elevation={5} className={classes.image}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              
              height="640"
              image={img2}
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.pT3}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.p3}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Paper>



      <Paper elevation={5} className={classes.services}>
      <div className={classes.service}>
      <Grid container spacing={3}>
        
        <Grid item xs={6}>
          
          <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              
              height="230"
              image={img3}
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.ServiceTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.ServiceDescription}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              
              height="230"
              image={img4}
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.ServiceTitle1}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.ServiceDescription1}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              
              height="230"
              image={img5}
              
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.ServiceTitle2}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.ServiceDescription2}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Grid>
        
      </Grid>
    </div>
      </Paper>




      <Paper elevation={5} className={classes.feedback}>
        <Feedback />
      </Paper>
      <Paper elevation={5} className={classes.feedbackform}>
      <FeedBackForm />
      </Paper>
      
      <Paper elevation={5} className={classes.formPaper}>
        <Form />
      </Paper>
      <Footer />
    </div>
  );
}
