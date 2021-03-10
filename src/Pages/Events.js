import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import EventRegisterForm from "../component/EventRegisterForm";
import Menu from "@material-ui/core/Menu";
import EventDetails from './eventDetails';
import NavBar from '../component/navbar';
import Footer from '../component/footer';
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
  title: {
    height: "auto",
    padding: theme.spacing(5),
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
  },

  card: {
    width: "auto",
    height: "auto",
    padding: theme.spacing(5),
  },
  formMenu: {
    width: "auto",
    alignContent: "center",
    justifyContent: "center",
  },
  formdetails:{
    width: "80%",
    alignContent: "center",
    justifyContent: "center",
  },
  cardContainer:{
    width:'auto',
    height:'auto',
    display:'inline-block',
    justifyContent:'space-between',
    margin:10,
    [theme.breakpoints.up('sm')]: {
      width:'auto',
    height:'auto',
    },


   
    
  },
}));

export default function EventsPage() {
  const classes = useStyles();
  const [data, setData] = React.useState({ Data: [] });
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [eventDetail, setEventDetail] = React.useState(null);
  
  const openForm = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openForm1 = (event) => {
    setEventDetail(event.currentTarget);
  };

  const handleClose1 = () => {
    setEventDetail(null);
  };

  React.useEffect(() => {
    Axios.post("http://172.26.34.83:81/Webandy/webandy/src/database/Event.php")
      .then((response) => {
        setData({ Data: response.data });
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className={classes.root}>
      <NavBar />
      <Paper elevation={3} className={classes.title}>
        <Typography gutterBottom variant="h4" component="h3">
          Upcoming Events
        </Typography>
      </Paper>
      <Paper elevation={6} className={classes.card}>
      {loading ? (
        <LinearProgress />
      ) : data.Data === 0 ? (
        <Card>
          <Typography gutterBottom variant="h6" component="h2">
            <p align="center">
              <b>There are no Upcoming Events.</b>
            </p>
          </Typography>
        </Card>
      ) : (
        <div>
          
            {data.Data.map((value, index) => {
              const image = value.Image;
              return (
                <div  className={classes.cardContainer}>
                <Card  key={index}>
                  <CardActionArea disabled>
                    <CardMedia
                      component="img"
                      height="230"
                      image={`data:image/jpeg;base64,${image}`}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        color="primary"
                      >
                        {value.Topic}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        color="textPrimary"
                      >
                        {value.Time}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {value.Status}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  {value.Status === "Open" ? (
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={openForm}
                      >
                        Register Here
                      </Button>
                      <Menu
                        className={classes.formMenu}
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <EventRegisterForm Eventname={value.Topic} />
                      </Menu>
                      <Button size="small" color="primary" aria-controls="Form-details"
                        aria-haspopup="true" onClick={openForm1}>
                        Learn More
                      </Button>
                      <Menu
                        className={classes.formdetails}
                        id="Form-details"
                        anchorEl={eventDetail}
                        keepMounted
                        open={Boolean(eventDetail)}
                        onClose={handleClose1}
                      >
                        <EventDetails EventTopic={value.Topic} />
                      </Menu>
                    </CardActions>
                  ) : (
                    <CardActions>
                      <Button size="small" color="primary" disabled>
                        Register Here
                      </Button>
                      <Button size="small" color="primary" disabled>
                        Learn More
                      </Button>
                    </CardActions>
                  )}
                </Card>
                </div>
              );
            })}
          
        </div>
      )}
      </Paper>
      
      <Footer />
      
    </div>
  );
}
