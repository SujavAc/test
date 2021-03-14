import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NavBarApp from "../../../navbar";
import Feedback from "../../../feedback";
import Form from "../../../Form/openform";
import Expert from "../../../../image/advice.jpg";
import Footer from "../../../footer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Accordion from "../Accordion";
import ExpertOpinion from "../../../../Pages/form";
import FeedBackForm from "../../../feedbackform/form";
import { fireStore } from "../../../../util/firebase";

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
    margin: 15,
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
    backgroundImage: "#000",
    backgroundSize: "cover",
  },
  image: {
    height: "auto",
    padding: theme.spacing(5),
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
  Accordion: {
    height: "auto",
    padding: theme.spacing(2),
    width: "auto",
    background: "linear-gradient(170deg, #fff3e0 30%, #26c6da 90%)",
  },
}));

export default function BachelorPage(props) {
  const img1 = props.Image;
  const [data, setData] = React.useState({ Data: [] });
  const [vetCourseDetails, setVetCourseDetails] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fireStore
      .collection("Vet and Trade course")
      .where("Title", "==", props.Title)
      .onSnapshot(onVetCourseDetailUpdate);
    fireStore
      .collection("FAQs")
      .where("Category", "==", props.Title)
      .onSnapshot(onCollectionUpdate);
  }, [props]);

  const onVetCourseDetailUpdate = (querySnapshot) => {
    const vetDetails = [];
    querySnapshot.forEach((doc) => {
      const { Title, Description, Moreinfo, Url } = doc.data();
      vetDetails.push({
        key: doc.id,
        doc,
        Title,
        Description,
        Moreinfo,
        Url,
      });
    });
    setVetCourseDetails({
      data: vetDetails,
    });
    setLoading(false);
  };

  const onCollectionUpdate = (querySnapshot) => {
    const faqs = [];
    querySnapshot.forEach((doc) => {
      const { Question, Answer, Date } = doc.data();
      faqs.push({
        key: doc.id,
        doc,
        Question,
        Answer,
        Date,
      });
    });
    setData({
      Data: faqs,
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBarApp />

      <div className={classes.Title}>
        <Paper elevation={5} className={classes.bg}>
          <Typography gutterBottom variant="h4" component="h1" color="tertiary">
            Planning to study <b>{props.Title}</b> course in Australia
          </Typography>
          <ExpertOpinion Title={"Get Expert Suggestions"} />
        </Paper>
      </div>

      {loading ? (
        <LinearProgress />
      ) : data.Data === 0 ? (
        <Paper elevation={5} className={classes.image}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h3">
              There are no recent data available.
            </Typography>
          </CardContent>
        </Paper>
      ) : (
        <div className={classes.Title}>
          {vetCourseDetails.data.map((value, index) => (
            <Paper elevation={5} key={value.key}>
              <CardContent key={index} className={classes.content}>
                <img alt="paper" height="100%" width="100%" src={value.Url} />
                <p align="left">
                  <b>Course Description:</b>
                  <br></br>
                </p>
                <Typography gutterBottom variant="h6" component="h3">
                  {value.Description}
                </Typography>
                <Typography gutterBottom variant="h6" component="h3">
                  {value.Moreinfo}
                  {/* <img height="fit content" width="330px" src={`data:image/jpeg;base64,${value.Image}`}/> */}
                </Typography>
              </CardContent>
              <img alt="card" height="100%" width="100%" src={img1} />
            </Paper>
          ))}
        </div>
      )}
      <Paper elevation={5} className={classes.Accordion}>
        <Typography variant="h6" align="center">
          Check out what our students frequent question in regards to {props.Title} Course.<br></br> If you have More queries beside that, we are please to have any queries regarding this course from you through below form.<br></br> Thank you.<br></br>
          <ExpertOpinion Title={"Any Queries ???? "} />
        </Typography>
        <Accordion Title={props.Title} Filter={"Category"} />
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
