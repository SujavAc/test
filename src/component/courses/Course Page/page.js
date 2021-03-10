import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NavBarApp from "../../navbar";
import Feedback from "../../feedback";
import Form from "../../Form/openform";
import Expert from "../../../image/advice.jpg";
import Footer from "../../footer";
import Axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import Question from '../component/Accordion';
import ExpertOpinion from '../../../Pages/form';
import FeedBackForm from '../../feedbackform/form';

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
    
    width: "auto",
  },

  feedback: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
    background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },
  feedbackform: {
    height: "auto",
    width: "auto",
    background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },
  formPaper: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
    backgroundImage: "url(" + Expert + ")",
    backgroundSize: "cover",
  },
  faq: {
    height: "auto",
    padding: theme.spacing(2),
    
    width: "auto",
    backgroundImage: '#000',
    backgroundSize: "cover",
  },
  image: {
    height: "auto",
    padding: theme.spacing(2),
    width: "auto",
    margin: 25,
    // backgroundImage: "url(" + Expert + ")",
    // backgroundSize: "cover",
    justifyContent: "center",
    textAlign: "center",
  },
  Title: {
    height: "auto",
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(1),
    
  },
  bg: {
    // backgroundImage:
    //   "url(https://www.slideteam.net/media/catalog/product/cache/960x720/d/i/different_subjects_text_on_blue_books_stock_photo_Slide01.jpg)",
    //   backgroundSize:'cover',
    //   backgroundPosition:'center',
    //   background: 'contain',
    height: "auto",
    width: "auto",
    justifyContent: "center",
    textAlign: "center",
    padding: theme.spacing(10),
  },
  card: {
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9,
    // marginTop:'30'
  },
  
}));

export default function Page(props) {
  const img1 = props.Image;
  const [data, setData] = React.useState({ Data: [] });
  const [loading, setLoading] = React.useState(true);
  

  React.useEffect(() => {
    const Title = new FormData();
  Title.append("Title", props.Title);
    Axios.post(
      "http://172.26.34.83:81/Webandy/webandy/src/database/course.php",
      Title
    )
      .then((response) => {
        setData({ Data: response.data });
        setLoading(false);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [data.Data,props.Title]);

  

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBarApp />
      
      {loading ? (
        <LinearProgress />
      ) : data.Data.length === 0 ? (
        <Paper elevation={5} className={classes.image}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              There are no recent data available.
            </Typography>
          </CardContent>
        </Paper>
      ) : (
        <div className={classes.Title}>
          <Paper elevation={5}  className={classes.bg}>
                <Typography gutterBottom variant="h4" component="h1" color="tertiary" >
                  Planning to study <b>{props.Title}</b> course in Australia
                </Typography>
                <ExpertOpinion Title={'Get Expert Opinion'}/>
            </Paper>
        </div>
      )}
     

      {loading ? (
        <LinearProgress />
      ) : data.Data.length === 0 ? (
        <Paper elevation={5} className={classes.image}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              There are no recent data available.
            </Typography>
          </CardContent>
        </Paper>
      ) : (
        <div className={classes.Title}>
          {data.Data.map((value, index) => (
            <Paper elevation={5} key={index}>
              <CardContent key={index} className={classes.content}>
              {/* <Image src={`data:image/jpeg;base64,${value.Image}`} /> */}
              <img alt="description of paper" width="100%" height="100%" src={`data:image/jpeg;base64,${value.Image}`}/>
                <p align="left">
                  <b>Course Description:</b>
                  <br></br>
                </p>
                <Typography gutterBottom variant="h6" component="h3">
                  {value.Description}
                  {value.Details}
                  {/* <img height="fit content" width="330px" src={`data:image/jpeg;base64,${value.Image}`}/> */}
                </Typography>
                <p align="left">
                  <b>Fee Structure:</b>
                  <br></br>
                </p>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="primary"
                  component="h2"
                >
                  {value.FeeStructure}
                </Typography>
                <p align="left">
                  <b>PR Pathway:</b>
                  <br></br>
                </p>
                <Typography variant="h6" color="primary" component="p">
                  {value.CarrerPathway}
                </Typography>
              </CardContent>
              <img alt="description of card" height='100%' width="100%" src={img1} />
              {/* <CardMedia
              key={index}
                  className={classes.cover}
                  image={img1}
                /> */}
            </Paper>
          ))}
        </div>
      )}
      <Paper elevation={5} className={classes.faq}>
      <Question />
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
