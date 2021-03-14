import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { fireStore, firebaseStorage } from "../../util/firebase";
import { DropzoneDialog } from "material-ui-dropzone";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
    close: {
      padding: theme.spacing(0.5),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function VetandTradeCourse() {
  const classes = useStyles();
  const [vetCourseData, setVetCourseData] = useState({
    Title: "",
    Description: "",
    url: "",
    Moreinfo:'',
  });
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState({ errMessage: "", successMsg: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [state, setState] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setState(false);
  };
  const handleSave = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);
  };
  const handleOpen = () => {
    setState(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    if (!vetCourseData.Title || !vetCourseData.Description || !image || !vetCourseData.Moreinfo) {
      setMsg({
        errMessage: "All field must be filled",
      });
    } else {
      const uploadImage = firebaseStorage
        .ref(`Vet course Picture/${image.name}`)
        .put(image);
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
            .ref("Vet course Picture")
            .child(image.name)
            .getDownloadURL()
            .then((url) =>
              fireStore
                .collection("Vet and Trade course")
                .add({
                  Title: vetCourseData.Title,
                  Description: vetCourseData.Description,
                  Moreinfo:vetCourseData.Moreinfo,
                  Url: url,
                })
                .then((docRef) => {
                  setMsg({
                    successMsg: "Successfully created the banner",
                  });
                  
                  setVetCourseData({
                    Title: "",
                    Description: "",
                    url: "",
                    Moreinfo:"",
                  });
                })
                .catch((error) => {
                  setMsg({
                    errMessage: "Errorin creating vet and trade course banner" ,error,
                  });
                  
                })
            );
        }
      );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      Set up banner for Vet and Trade Course
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={vetCourseData.Title}
        onChange={(event) => {
          const title = event.target.value;
          setVetCourseData((prevSetData) => ({
            Title: title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="Description"
        multiline
        variant="outlined"
        value={vetCourseData.Description}
        onChange={(event) => {
          const description = event.target.value;
          setVetCourseData((prevSetData) => ({
            Title: prevSetData.Title,
            Description: description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="More Info"
        multiline
        variant="outlined"
        value={vetCourseData.Moreinfo}
        onChange={(event) => {
          const moreinfo = event.target.value;
          setVetCourseData((prevSetData) => ({
            Title: prevSetData.Title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:moreinfo,
          }));
        }}
      />
      <br></br>
      <Button
        onClick={handleOpen.bind(this)}
        variant="contained"
        color="primary"
      >
        Add Image
      </Button>
      <DropzoneDialog
        open={state}
        onSave={handleSave.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <br></br>

      <Button color="primary" onClick={handleClick} variant="contained">
        Submit
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {msg.errMessage ? (
          <Alert onClose={handleCloseSnackbar} severity="error">
            {msg.errMessage}
          </Alert>
        ) : (
          <Alert onClose={handleCloseSnackbar} severity="success">
            {msg.successMsg}
          </Alert>
        )}
      </Snackbar>
    </form>
  );
}
