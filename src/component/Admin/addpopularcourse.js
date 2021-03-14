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

export default function AddpopularCourse() {
  const classes = useStyles();
  const [popularcourse, setPopularCourse] = useState({
    Title: "",
    Description: "",
    url: "",
    Moreinfo:'',
    Prpathway:'',
    FeeStructure:'',
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
    if (!popularcourse.Title || !popularcourse.Description || !image || !popularcourse.Moreinfo || !popularcourse.Prpathway || !popularcourse.FeeStructure) {
      setMsg({
        errMessage: "All field must be filled",
      });
    } else {
      const uploadImage = firebaseStorage
        .ref(`Popular Course/${image.name}`)
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
            .ref("Popular Course")
            .child(image.name)
            .getDownloadURL()
            .then((url) =>
              fireStore
                .collection("Popular Course")
                .add({
                  Title: popularcourse.Title,
                  Description: popularcourse.Description,
                  Moreinfo:popularcourse.Moreinfo,
                  PRpathway:popularcourse.Prpathway,
                  FeeStructure:popularcourse.FeeStructure,
                  Url: url,
                })
                .then((docRef) => {
                    setMsg({
                        successMsg: "Successfully created the banner for popular course",
                      });
                  setPopularCourse({
                    Title: "",
                    Description: "",
                    url: "",
                    Moreinfo:"",
                    Prpathway:"",
                    FeeStructure:"",

                  });
                })
                .catch((error) => {
                    setMsg({
                        errMessage: "Error creating banner for Popular course:",error,
                      });
                  
                })
            );
        }
      );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      Set up banner for Popular Course
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={popularcourse.Title}
        onChange={(event) => {
          const title = event.target.value;
          setPopularCourse((prevSetData) => ({
            Title: title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
            Prpathway:prevSetData.Prpathway,
            FeeStructure:prevSetData.FeeStructure,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="Description"
        multiline
        variant="outlined"
        value={popularcourse.Description}
        onChange={(event) => {
          const description = event.target.value;
          setPopularCourse((prevSetData) => ({
            Title: prevSetData.Title,
            Description: description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
            Prpathway:prevSetData.Prpathway,
            FeeStructure:prevSetData.FeeStructure,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="More Info"
        multiline
        variant="outlined"
        value={popularcourse.Moreinfo}
        onChange={(event) => {
          const moreinfo = event.target.value;
          setPopularCourse((prevSetData) => ({
            Title: prevSetData.Title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:moreinfo,
            Prpathway:prevSetData.Prpathway,
            FeeStructure:prevSetData.FeeStructure,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="PR Pathway"
        multiline
        variant="outlined"
        value={popularcourse.Prpathway}
        onChange={(event) => {
          const prpathway = event.target.value;
          setPopularCourse((prevSetData) => ({
            Title: prevSetData.Title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
            Prpathway:prpathway,
            FeeStructure:prevSetData.FeeStructure,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="Fee Structure"
        multiline
        variant="outlined"
        value={popularcourse.FeeStructure}
        onChange={(event) => {
          const feestructure = event.target.value;
          setPopularCourse((prevSetData) => ({
            Title: prevSetData.Title,
            Description: prevSetData.Description,
            Details: prevSetData.Details,
            Moreinfo:prevSetData.Moreinfo,
            Prpathway:prevSetData.Prpathway,
            FeeStructure:feestructure,
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
