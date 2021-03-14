import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Page from "./pages";
import Paper from "@material-ui/core/Paper";
import EnquiryList from "../component/Admin/enquiryList";
import VetandTradeCourse from '../component/Admin/Vetandtradecourseform';
import PopularCourseForm from '../component/Admin/addpopularcourse';
import BlogForm from '../component/Admin/addBlogPost';
import EventForm from '../component/Admin/EventForm';
import FAQsForm from '../component/Admin/FAQs';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "auto",
      height: theme.spacing(16),
    },
    close: {
      padding: theme.spacing(0.5),
    },
    flexGrow: 1,
    width: "auto",
  },
  form: {},

  list: {
    height: "100%",
    width: "100%",
    textAlign: "center",
  },

  card: {
    maxWidth: "100%",
    width: "100%",
    height: "auto",
  },
  golden: {
    color: "rgb(205, 112, 0)",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
  },

  paper: {
    height: "auto",
    padding: theme.spacing(2),
    margin: 25,
    width: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  paper1: {
    width: "auto",
    padding: theme.spacing(1),
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    margin: 25,
    marginTop: 150,
  },
}));

export default function Admin() {
  const [data, setData] = useState({ Title: "", Description: "" });
  // const [enquiryData, setEnquiryData] = React.useState({ data: [] });
  const [image, setImage] = useState({ selectedFile: "" });
  const [msgError, setMsgError] = useState({ message: "", success: "" });
  const classes = useStyles();
  // const [loading, setLoading] = React.useState(true);
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });

  // React.useEffect(() => {
  //   Axios.post(
  //     "http://localhost:81/Webandy/webandy/src/database/getenquiryform.php"
  //   )
  //     .then((response) => {
  //       console.log(response.data);
  //       setEnquiryData({ data: response.data });
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const onChangeFile = (event) => {
    const picture = event.target.files[0];
    setData((prevSetData) => ({
      Title: prevSetData.Title,
      Description: prevSetData.Description,
    }));
    setImage({
      selectedFile: picture,
      //URL.createObjectURL(picture)
    });
    console.log(event.target.files[0]);
  };
  const handleClick = (Transition) => () => {
    setState({
      open: true,
      Transition,
    });
    if (!image.selectedFile || !data.Title || !data.Description) {
      setMsgError({
        message: "fill all the details",
      });
    } else {
      const contentData = new FormData();
      contentData.append("Title", data.Title);
      contentData.append("Description", data.Description);
      contentData.append(
        "Picture",
        image.selectedFile,
        image.selectedFile.name
      );

      Axios.post(
        "http://172.26.34.83:81/Webandy/webandy/src/database/post.php",
        contentData
      )
        .then((res) => {
          console.log(res);
          console.log(res);
          setMsgError({
            message: res.data,
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <div className={classes.root}>
      <Paper elevation={5} className={classes.paper1}>
        <form Validate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(event) => {
              const title = event.target.value;
              setData((prevSetData) => ({
                Title: title,
                Picture: prevSetData.Picture,
                Description: prevSetData.Description,
              }));
            }}
          />
          <br></br>
          <br></br>
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(event) => {
              const description = event.target.value;
              setData((prevSetData) => ({
                Title: prevSetData.Title,
                Description: description,
                Picture: prevSetData.Picture,
              }));
            }}
          />
          <p className="title">Select Image:</p>
          <div style={{ marginBottom: 10 }}>
            <input type="file" onChange={onChangeFile} />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick(SlideTransition)}
          >
            Create Banner
          </Button>
        </form>
      </Paper>
      <Paper elevation={5} className={classes.paper1}>
        <VetandTradeCourse />
      </Paper>
      <Paper elevation={5} className={classes.paper1}>
        <PopularCourseForm />
      </Paper>
      <Paper elevation={5} className={classes.paper1}>
        <BlogForm />
      </Paper>
      <Paper elevation={5} className={classes.paper1}>
        <EventForm />
      </Paper>
      <Paper elevation={5} className={classes.paper1}>
        <FAQsForm />
      </Paper>
      
      <Paper elevation={5} className={classes.paper1}>
        <EnquiryList />
      </Paper>

      <Page
        Title={"Welcome To Admin Page"}
        image1={"https://i.redd.it/1vemqfhuf9u41.jpg"}
        pT2={
          "Don’t leave your options to chance, speak with the AECC Global experts before you make a big decision"
        }
        p2={
          "As an international student, choosing the right course of study for you in Australia is an important decision. It’s not only money, it’s also time that you can’t get back if you choose a course or institution here that doesn’t meet your study or long term career objectives. Talking with an Education Counsellor from AECC Global can help. You can tell us your career goals and we’ll give you expert guidance on the study choices that will get you there. We can help, whichever stage you’re at: Considering university or further courses of education in Australia? Want to know about different institutions in Australia and how they compare so you can make a good choice? Need assistance with student visa? It doesn’t matter, if you’ve studied before or not, we can help international students at every level, from university preparation courses right through to PhD and Master’s level research."
        }
        image2={
          "https://ih0.redbubble.net/image.8712023.7976/flat,1000x1000,075,f.jpg"
        }
        pT3={"Seek advice from an education industry-leader"}
        p3={
          "With almost 10 years’ experience and a wonderful team of QEAC Certified Education Counsellors, AECC Global can give you all the guidance and services you need to study in Australia. From course selection and managing your study application to visa advice and application services through our in-house migration agents to extensive support for health cover, taxation, accommodation and more, we are here for international students. We will start with learning about you and your goals, then our friendly Education Counsellors will help you find a fantastic course at an institution that gets you where you want to go. We’ll help arrange everything, from your course application to offer letter and study visa. We will also guide you on accommodation health cover and insurance. We will also search for applicable financial assistance and scholarships you could get. We know that leaving your home country to study overseas is an exciting journey – and we’ll be with you the whole way whenever you need advice or assistance throughout your stay in Australia."
        }
      />

      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={msgError.message}
        key={state.Transition.name}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
}
