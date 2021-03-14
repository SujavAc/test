import React, { useState } from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Image from "../../image/feedback.jpg";
import { firebaseStorage, fireStore } from "../../util/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url(" + Image + ")",
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
    message: "",
    rating: "",
  });
  const [state, setState] = useState({ open: false, photo: "" });
  const [msgError, setMsgError] = useState({ message: "", success: "" });

  const handleClose = () => {
    setState((prevSetData) => ({
      open: false,
      photo: prevSetData.photo,
    }));
    console.log(state);
  };

  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setState({
      open: false,
      photo: image,
    });
  };

  const handleOpen = () => {
    setState((prevSetData) => ({
      open: true,
      photo: prevSetData.photo,
    }));
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (
      !state.photo ||
      !data.name ||
      !data.message ||
      !data.rating ||
      !data.email
    ) {
      setMsgError({
        message: "fill all the details",
      });
    } else {
      const img = state.photo;
      const uploadImage = firebaseStorage
        .ref(`Feedback Photos/${img.name}`)
        .put(state.photo);
      uploadImage.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot");
        },
        (error) => {
          console.log(error);
        },

        () => {
          firebaseStorage
            .ref("Feedback Photos")
            .child(img.name)
            .getDownloadURL()
            .then((url) =>
              fireStore
                .collection("Feedback List")
                .add({
                  Name: data.name,
                  Email: data.email,
                  Message: data.message,
                  Rating: data.rating,
                  Url: url,
                })
                .then((docRef) => {
                  console.log("Successfully store in firestore");
                  setData({
                    name: "",
                    email: "",
                    message: "",
                    rating: "",
                  });
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                })
            );
        }
      );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      FeedBack Form
      <TextField
        id="standard-basic"
        label="Full Name"
        value={data.name}
        onChange={(event) => {
          const FullName = event.target.value;
          setData((prevSetData) => ({
            name: FullName,
            email: prevSetData.email,
            message: prevSetData.message,
            rating: prevSetData.rating,
          }));
        }}
      />
      <TextField
        id="standard-basic"
        label="Email"
        value={data.email}
        onChange={(event) => {
          const Email = event.target.value;
          setData((prevSetData) => ({
            name: prevSetData.name,
            email: Email,
            message: prevSetData.message,
            rating: prevSetData.rating,
          }));
        }}
      />
      <TextField
        id="standard-multiline-static"
        label="Message"
        value={data.message}
        multiline
        rows={4}
        onChange={(event) => {
          const Message = event.target.value;
          setData((prevSetData) => ({
            name: prevSetData.name,
            email: prevSetData.email,
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
          value={data.rating}
          onChange={(event) => {
            const Rating = event.target.value;
            setData((prevSetData) => ({
              name: prevSetData.name,
              email: prevSetData.email,
              message: prevSetData.message,
              rating: Rating,
            }));
          }}
        />
      </div>
      <Button
        onClick={handleOpen.bind(this)}
        variant="contained"
        color="primary"
      >
        Add Image
      </Button>
      <DropzoneDialog
        open={state.open}
        onSave={handleSave.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <Button onClick={handleClick} variant="contained" color="primary">
        Submit
      </Button>
      {msgError ? msgError.message : msgError.success}
    </form>
    
  );
}
