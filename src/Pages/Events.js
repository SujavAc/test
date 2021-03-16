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
import LinearProgress from "@material-ui/core/LinearProgress";
import EventRegisterForm from "../component/EventRegisterForm";
import Menu from "@material-ui/core/Menu";
import NavBar from '../component/navbar';
import Footer from '../component/footer';
import {fireStore} from '../util/firebase';

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
    width: "60%",
    alignContent: "center",
    justifyContent: "center",
    padding:theme.spacing(4),
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
  eventDetails:{
    width:'62%',
    height:'100%',
    justifyContent:'center',
    textAlign:'center',
    padding:theme.spacing(3),
    margin:10,
  },
}));

export default function EventsPage() {
  const classes = useStyles();
  const [data,setData] = React.useState({ Data: [] });
  const [loading,setLoading] = React.useState(true);
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
    fireStore.collection('Events').onSnapshot(onCollectionUpdate);
  }, []);

  const onCollectionUpdate = (querySnapshot) => {
    const event = [];
    querySnapshot.forEach((doc) => {
      const { EventTitle, EventDescription, Date, EventUploadDate, EventImage, Host1Image, HostName1, HostPosition1,Host2Image, HostName2, HostPosition2, Status  } = doc.data();
      event.push({
        key: doc.id,
        doc,
        EventTitle,
        EventDescription,
        EventUploadDate,
        Date,
        EventImage,
        Host1Image, 
        HostName1, 
        HostPosition1,
        Host2Image, 
        HostName2, 
        HostPosition2, 
        Status
       
      });
    });
    setData({
      Data: event,
    });
    setLoading(false);
    
  };
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
              
              return (
                <div  className={classes.cardContainer}>
                <Card  key={value.key}>
                  <CardActionArea disabled>
                    <CardMedia
                      component="img"
                      height="230"
                      image={value.EventImage}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        color="primary"
                      >
                        {value.EventTitle}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        color="textPrimary"
                      >
                        {value.Date}
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
                        <EventRegisterForm Eventname={value.EventTitle} />
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
                        <Paper className={classes.eventDetails}>
                        <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        color="primary"
                      >
                        {value.EventTitle}
                      </Typography>
                        <Typography paragraph 
                        
                        
                        >
                          {value.EventDescription}
                        </Typography>
                        <Typography
                          variant="h4"
                          color="textPrimary"
                          component="p"
                        >
                          Host By:
                        </Typography>
                        <CardMedia
                        component="img"
                        height="230"
                        width="300"
                        image={value.Host1Image}
                      />
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          component="p"
                        >
                          {value.HostName1}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="p"
                        >
                          {value.HostPosition1}
                        </Typography>
                        <CardMedia
                        component="img"
                        height="230"
                        width="300"
                        image={value.Host2Image}
                      />
                        <Typography
                          variant="h6"
                          color="textPrimary"
                          component="p"
                        >
                          {value.HostName2}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component="p"
                        >
                          {value.HostPosition2}
                        </Typography>
                        <CardActions>
                        <Button
                        size="small"
                        color="primary"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={openForm}
                        variant='contained'
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
                        <EventRegisterForm Eventname={value.EventTitle} />
                      </Menu>
                      </CardActions>
                        </Paper>
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
