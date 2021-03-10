import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import logo from "../logo.svg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
      height: theme.spacing(16),
    },
    flexGrow: 1,
    width: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    height: "auto",
    padding: theme.spacing(2),
    
    width: "auto",
    background: "linear-gradient(180deg, #fafafa 30%, #26c6da 90%)",

    [theme.breakpoints.up("xs")]: {
      width: "auto",
      height: "auto",
    },
    [theme.breakpoints.up("sm")]: {
      width: "auto",
      height: "auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "auto",
      height: "auto",
    },
  },
  image: {
    width: 128,
    height: 128,
  },
  gridList: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Footer() {
  const classes = useStyles();
  const styles = useFadedShadowStyles();

  return (
    <div className={classes.root}>
      
      <Paper className={classes.paper} classes={styles}>
        <Grid item xs={12} className={classes.gridList}>
          <Link to="Homepage">
            {" "}
            <img width="200px" src={logo} alt="logo" />
          </Link>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Quick Links
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Link to= 'About Us'> About us </Link>
                </Typography>
                <Typography variant="body2" gutterBottom>
                 <Link to ='FAQs'>FAQs</Link> 
                </Typography>
                <Typography variant="body2" gutterBottom>
                <Link to ='Events'>Events</Link>
                </Typography>
                <Typography variant="body2" gutterBottom>
                <Link to ='Blog'>Blogs</Link>
                </Typography>
                <Typography variant="body2" gutterBottom>
                <Link to ='Student Testimonials'>Testimonials</Link>
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">Top Courses</Typography>
                <Typography variant="body2" gutterBottom>
                  Aged Care
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Automatives
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Buildings and Construction
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Business analytics
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Cyber Security
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">Our Services</Typography>
                <Typography variant="body2" gutterBottom>
                  Education Counselling
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Visa and Migration
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Scholarships
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Health Cover
                </Typography>
                <Typography variant="body2" gutterBottom>
                  PR Pathways
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">Email Susbcription</Typography>

                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField id="input-with-icon-grid" label="Email" />
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
