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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    "& > *": {
      width: "100%",
      height: theme.spacing(10),
    },
    
    
  },
  title: {
    height: "auto",
    padding: theme.spacing(10),
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
  },

  card: {
    display: "flex",
    displayDirection: "column",
    width: "auto",
    height: "auto",
    
  },
  formMenu: {
    width: "auto",
    alignContent: "center",
    justifyContent: "center",
  },
}));

export default function EventsDetails(props) {
  const classes = useStyles();
  const [data, setData] = React.useState({ Data: [] });
  const [loading, setLoading] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const openForm = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  React.useEffect(() => {
    const formData = new FormData();
  formData.append('Topic',props.EventTopic);
    Axios.post("http://172.26.34.83:81/Webandy/webandy/src/database/EventDetails.php",formData)
      .then((response) => {
        setData({ Data: response.data });
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props.EventTopic]);
  
  return (
    <div className={classes.root}>
        <Card>
          <Typography gutterBottom variant="h6" component="h2">
            <p align="center">
              <b>{props.EventTopic}</b>
            </p>
          </Typography>
        </Card>
      {loading ? (
        <LinearProgress />
      ) : data.Data === 0 ? (
        <Card>
          <Typography gutterBottom variant="h6" component="h2">
            <p>
              <b>The event is pospond.</b>
            </p>
          </Typography>
        </Card>
      ) : (
        <div>
          <Paper elevation={6} className={classes.card}>
            {data.Data.map((value, index) => {
              const image = value.Image;
              const speaker1 = value.SpeakerImage;
              const speaker2 = value.SpeakerImage2;
              
              return (
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
                      <Typography paragraph
                        
                        
                      >
                        {value.Description}
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
                      image={`data:image/jpeg;base64,${speaker1}`}
                    />
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        component="p"
                      >
                        {value.SpeakerName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {value.SpeakerPosition}
                      </Typography>
                      <CardMedia
                      component="img"
                      height="230"
                      image={`data:image/jpeg;base64,${speaker2}`}
                    />
                      <Typography
                        variant="h6"
                        color="textPrimary"
                        component="p"
                      >
                        {value.SpeakerName2}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {value.SpeakerPosition2}
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
                        <EventRegisterForm Eventname={value.Topic} />
                      </Menu>
                     
                    </CardActions>
                  ) : (
                    <CardActions>
                      <Button size="small" color="primary" disabled>
                        Register Here
                      </Button>
                    </CardActions>
                  )}
                </Card>
              );
            },[data.Data])}
          </Paper>
        </div>
      )}
    </div>
  );
}
