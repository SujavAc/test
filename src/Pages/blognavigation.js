import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import FeedBack from "../component/feedback";
import FeedBackForm from "../component/feedbackform/form";
import Footer from "../component/footer";
import ExpertForm from './form';
import Axios from 'axios';
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  card: {
    //maxWidth: 550,
    margin: 15,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  form:{
    "& > *": {
          margin: theme.spacing(1),
          position: "fixed",
          right: "0%",
          top: "50%",
        },
  }
}));

export default function BlogCard(props) {
  const classes = useStyles();
  const [data, setData] = React.useState({ Data: [] });
  const [loading, setLoading] = React.useState(true);
  const [expanded, setExpanded] = React.useState(false);
  
  const handleExpandClick=() => {
    
      setExpanded(!expanded);
    
    
  };
  

 
  React.useEffect(() => {
    const filterdata = new FormData();
    filterdata.append('title',props.Title);
    filterdata.append('category',props.Category);
    filterdata.append('date',props.Date);
    filterdata.append('authorname',props.Authorname);
    Axios.post("http://172.26.34.83:81/Webandy/webandy/src/database/blogfilter.php",filterdata)
      .then((response) => {
        setData({ Data: response.data });
        console.log(response);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [props]);
  return (
    <div className={classes.root}>

      <Grid container spacing={3}>
        <Grid xs={12}>
        </Grid>
        <Grid xs={12}>
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
                <Card className={classes.card} key={index}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar} src={`data:image/jpeg;base64,${value.AuthorImage}`} />
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={value.PostTitle}
              subheader={value.Date}
              subHeader={value.AuthorName}
            />
            <CardMedia
              className={classes.media}
              image={`data:image/jpeg;base64,${value.BlogImage}`}
              title={value.PostTitle}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {value.BlogDescription}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <CardContent>
              <Typography color="Primary">Blog</Typography>
            </CardContent>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{value.Title1}</Typography>
                <Typography paragraph>
                 {value.Description1}
                </Typography>
                <Typography variant="h4">
                  {value.Title2}
                </Typography>
                <Typography paragraph>
                  {value.Description2}
                </Typography>
                <Typography variant="h4">
                  {value.Title3}
                </Typography>
                <Typography paragraph>
                  {value.Description3}
                </Typography>
                <Typography style={{textAlign:'right'}}color="Primary">{value.AuthorName}</Typography>
              </CardContent>
            </Collapse>
          </Card>
                </div>
              );
            })}
          
        </div>
      )}
          
        </Grid>
        <Grid xs={12}>
          <FeedBack />
        </Grid>
        <Paper style={{width:'100%'}} elevation={5}>
        <FeedBackForm />
        </Paper>
          
        
        <Grid xs={12} className={classes.form }>
          <ExpertForm Title={'Free Counselling'}/>
        </Grid>
        <Grid xs={12}>
          <Footer />
        </Grid>

        
      </Grid>
    </div>
  );
}
