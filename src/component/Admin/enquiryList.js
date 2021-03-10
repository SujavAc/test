import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Grow } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      height: theme.spacing(5),
    },
    close: {
      padding: theme.spacing(0.5),
    },
    flexGrow: 1,
    width: "auto",
    height:'auto',
  },
  golden: {
    color: "rgb(205, 112, 0)",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    padding:theme.spacing(4),
    height: "auto",
    width: "auto",
    
  },
}));
export default function List() {
  const classes = useStyles();
  const [enquiryData, setEnquiryData] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.post(
      "http://172.26.34.83:81/Webandy/webandy/src/database/getenquiryform.php"
    )
      .then((response) => {
        setEnquiryData({ data: response.data });
        setLoading(false);
        
      })
      .catch((err) => console.log(err));
  }, [enquiryData.data]);

  

  return (
    <div className={classes.root}>
      <h1 style={{ textAlign: "center" }}>
        Our <span className={classes.golden}>Enquiry Lists </span>
        
      </h1>
      {loading ? (
        <LinearProgress />
      ) : enquiryData.data === 0 ? (
        
        <div className={classes.paper}>
        <Container>
          <Grow in>
            <Grid container spacing={5} padding={10}>
              
                <Paper elevation={5} className={classes.paper}>
                  <Card >
                    
                        <Typography gutterBottom variant="h6" component="h2">
                          <p>
                            
                            <b>There are no recent queries left.</b> 
                          </p>
                        </Typography>
                        
                  </Card>
                </Paper>
              
            </Grid>
          </Grow>
        </Container>
      </div>
        
        
        
      ) : (
        <div className={classes.paper}>
        <Container>
          <Grow in>
            <Grid container spacing={5} padding={10}>
              {enquiryData.data.map((value, index) => (
                <Paper elevation={5} >
                  <Card key={index.ID}>
                    <CardActionArea key={index.ID}>
                      <CardContent key={index.ID}>
                        <Typography gutterBottom variant="h6" component="h2">
                          <p>
                            {" "}
                            <b>Full Name:</b> {value.FullName}
                          </p>
                        </Typography>
                        <Typography variant="h6" component="h5">
                          <p>
                            {" "}
                            <b>Email:</b> {value.Email}
                          </p>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <p>
                            {" "}
                            <b>Message:</b> {value.Message}{" "}
                          </p>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="h5"
                        >
                          <p>
                            {" "}
                            <b>Date:</b> {value.Date}{" "}
                          </p>
                          <br></br>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions key={index.ID}>
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          const ID = new FormData();
                          ID.append("ID", value.ID);
                          Axios.post(
                            "http://localhost:81/Webandy/webandy/src/database/deleteData.php",
                            ID
                          )
                            .then((response) => {
                              console.log(response.data);
                              
                              
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Paper>
              ),[enquiryData.data])}
            </Grid>
          </Grow>
        </Container>
      </div>
      )}
    </div>
  );
}
