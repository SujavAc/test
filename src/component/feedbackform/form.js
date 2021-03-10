import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import Image from '../../image/feedback.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage:'url('+Image+')',
    backgroundSize: "cover",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
    },

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "40ch",
    },
  },
  // feedback: {
  //   position: "absolute",
  //   left: "50%",
  //   top: "50%",
  //   transform: "translate(-50%, -50%)",
  // },
  rating: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function HalfRating() {
  const classes = useStyles();
  const [data, setData] = useState({
    name: "",
    email: "",
    photo: "",
    message: "",
    rating: "",
  });
  const [state, setState] = useState({ open: false, files: [] });
  const [msgError, setMsgError] = useState({ message: "", success: "" });
  const handleClose = () => {
    setState({
      open: false,
    });
  };

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    setState({
      files: files,
      open: false,
    });
    const Image = files[0];
    console.log(Image);
    setData((prevSetData) => ({
      photo: Image,
      name: prevSetData.name,
      email: prevSetData.email,
      message: prevSetData.message,
      rating: prevSetData.rating,
    }));
  };

  const handleOpen = () => {
    setState({
      open: true,
    });
  };
  const handleClick = () => {
    console.log(data);
    if (
      !data.photo ||
      !data.name ||
      !data.message ||
      !data.rating ||
      !data.email
    ) {
      setMsgError({
        message: "fill all the details",
      });
    } else {
      const contentData = new FormData();
      contentData.append("name", data.name);
      contentData.append("message", data.message);
      contentData.append("email", data.email);
      contentData.append("rating", data.rating);
      contentData.append("image", data.photo, data.photo.name);
      console.log(contentData);
      Axios.post(
        "http://localhost:81/Webandy/webandy/src/database/postReview.php",
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

  return (
    
    <form className={classes.root} noValidate autoComplete="off">
      FeedBack Form
      <TextField
        id="standard-basic"
        label="Full Name"
        onChange={(event) => {
          const FullName = event.target.value;
          setData((prevSetData) => ({
            name: FullName,
            email: prevSetData.email,
            photo: prevSetData.photo,
            message: prevSetData.message,
            rating: prevSetData.rating,
          }));
        }}
      />
      <TextField
        id="standard-basic"
        label="Email"
        onChange={(event) => {
          const Email = event.target.value;
          setData((prevSetData) => ({
            name: prevSetData.name,
            email: Email,
            photo: prevSetData.photo,
            message: prevSetData.message,
            rating: prevSetData.rating,
          }));
        }}
      />
      
      <TextField
        id="standard-multiline-static"
        label="Message"
        multiline
        rows={4}
        onChange={(event) => {
          const Message = event.target.value;
          setData((prevSetData) => ({
            name: prevSetData.name,
            email: prevSetData.email,
            photo: prevSetData.photo,
            message: Message,
            rating: prevSetData.rating,
          }));
        }}
      />
      <div className={classes.rating}>
        <Rating
          name="half-rating"
          precision={0.5}
          size="large"
          onChange={(event) => {
            const Rating = event.target.value;
            setData((prevSetData) => ({
              name: prevSetData.name,
              email: prevSetData.email,
              photo: prevSetData.photo,
              message: prevSetData.message,
              rating: Rating,
            }));
          }}
        />
        
      </div>
      <Button onClick={handleOpen.bind(this)} variant='contained' color='primary'>Add Image</Button>
      <DropzoneDialog
        open={state.open}
        onSave={handleSave.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <Button onClick={handleClick} variant='contained' color='primary'>Submit</Button>
      {msgError?(msgError.message):(msgError.success)}
    </form>
    //</div>
  );
}
