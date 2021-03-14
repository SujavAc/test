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

export default function AddEvents() {
  const classes = useStyles();
  const [event, setEvent] = useState({
    EventTitle: "",
    EventDescription: "",
    HostName1: "",
    HostPosition1: "",
    Date: "",
    HostName2: "",
    HostPosition2: "",
    Status: "",
  });
  const [url, setUrl] = useState({
    Host1Url: "",
    Host2url: "",
    EventPhoto: "",
  });
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState({ errMessage: "", successMsg: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [state, setState] = useState({
    Host1: false,
    Host2: false,
    Event: false,
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setState({ Host1: false, Host2: false, Event: false });
  };
  const handleHost1Url = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);

    const uploadImage = firebaseStorage.ref(`Events/${image.name}`).put(image);
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
          .ref("Events")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl((prevSetData) => ({
              Host1Url: url,
              Host2url: prevSetData.Host2url,
              EventPhoto: prevSetData.EventPhoto,
            }));
            setImage("");
          });
      }
    );
  };
  const handleSaveHost2Url = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);

    const uploadImage = firebaseStorage.ref(`Events/${image.name}`).put(image);
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
          .ref("Events")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl((prevSetData) => ({
              Host1Url: prevSetData.Host1Url,
              Host2url: url,
              EventPhoto: prevSetData.EventPhoto,
            }));
            setImage("");
          });
      }
    );
  };
  const handleSaveEventUrl = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);

    const uploadImage = firebaseStorage.ref(`Events/${image.name}`).put(image);
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
          .ref("Events")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl((prevSetData) => ({
              Host1Url: prevSetData.Host1Url,
              Host2url: prevSetData.Host2url,
              EventPhoto: url,
            }));
            setImage("");
          });
      }
    );
  };
  const handleOpenHost1 = () => {
    setState({ Host1: true, Host2: false, Event: false });
  };
  const handleOpenHost2 = () => {
    setState({ Host1: false, Host2: true, Event: false });
  };
  const handleOpenEvent = () => {
    setState({ Host1: false, Host2: false, Event: true });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    if (
      !event.EventTitle ||
      !event.EventDescription ||
      !event.HostName1 ||
      !event.HostPosition1 ||
      !event.HostName2 ||
      !event.HostPosition2 ||
      !event.Status ||
      !url.EventPhoto ||
      !url.Host1Url ||
      !url.Host2url
    ) {
      setMsg({
        errMessage: "All field must be filled",
      });
    } else {
      //   const uploadImage = firebaseStorage
      //     .ref(`Popular Course/${image.name}`)
      //     .put(image);
      //   uploadImage.on(
      //     "state_changed",
      //     (snapshot) => {
      //       console.log("snapshot");
      //     },
      //     (error) => {
      //       console.log(error);
      //     },

      //     () => {
      //       firebaseStorage
      //         .ref("Popular Course")
      //         .child(image.name)
      //         .getDownloadURL()
      //         .then((url) =>
      fireStore
        .collection("Events")
        .add({
          EventTitle: event.EventTitle,
          EventDescription: event.EventDescription,
          HostName1: event.HostName1,
          HostPosition1: event.HostPosition1,
          Date: event.Date,
          HostName2: event.HostName2,
          HostPosition2: event.HostPosition2,
          Status: event.Status,
          Host1Image: url.Host1Url,
          Host2Image: url.Host2url,
          EventImage: url.EventPhoto,
          EventUploadDate:new Date().toLocaleString(),
        })
        .then((docRef) => {
          setMsg({
            successMsg: "Successfully created the banner for popular course",
          });
          setEvent({
            EventTitle: "",
            EventDescription: "",
            HostName1: "",
            HostPosition1: "",
            Date: "",
            HostName2: "",
            HostPosition2: "",
            Status: "",
          });
          setUrl({
            Host1Url: "",
            Host2url: "",
            EventPhoto:''
          });
        })
        .catch((error) => {
          setMsg({
            errMessage: "Error creating banner for Popular course:",
            error,
          });
        });
      //         );
      //     }
      //   );
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      Post Event from here
      <TextField
        id="outlined-basic"
        label="Event Title"
        variant="outlined"
        value={event.EventTitle}
        onChange={(event) => {
          const eventTitle = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: eventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1: prevSetData.HostName1,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2: prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Event Description"
        variant="outlined"
        value={event.EventDescription}
        onChange={(event) => {
          const eventDescription = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: eventDescription,
    HostName1: prevSetData.HostName1,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2: prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Host Name 1st"
        variant="outlined"
        value={event.HostName1}
        onChange={(event) => {
          const hostName1 = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1: hostName1,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2: prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      {url.Host1Url ? <img src={url.Host1Url} alt="Host1" /> : <div></div>}
      <Button
        onClick={handleOpenHost1.bind(this)}
        variant="contained"
        color="primary"
      >
        Add Host 1st Image
      </Button>
      <DropzoneDialog
        open={state.Host1}
        onSave={handleHost1Url.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label=" 2nd Host Name"
        variant="outlined"
        value={event.HostName2}
        onChange={(event) => {
          const hostName2 = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1:prevSetData.HostName1 ,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2: hostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      {url.Host2url ? <img src={url.Host2url} alt="author" /> : <div></div>}
      <Button
        onClick={handleOpenHost2.bind(this)}
        variant="contained"
        color="primary"
      >
        Add 2nd Host Image
      </Button>
      <DropzoneDialog
        open={state.Host2}
        onSave={handleSaveHost2Url.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label=" 1st Host Position"
        variant="outlined"
        value={event.HostPosition1}
        onChange={(event) => {
          const hostPosition1 = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1:prevSetData.HostName1 ,
    HostPosition1: hostPosition1,
    Date: prevSetData.Date,
    HostName2:prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label=" 2nd Host Position"
        variant="outlined"
        value={event.HostPosition2}
        onChange={(event) => {
          const hostPosition2 = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1:prevSetData.HostName1 ,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2:prevSetData.HostName2,
    HostPosition2: hostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="  Event Status"
        variant="outlined"
        value={event.Status}
        onChange={(event) => {
          const status = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1:prevSetData.HostName1 ,
    HostPosition1: prevSetData.HostPosition1,
    Date: prevSetData.Date,
    HostName2:prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: status,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label=" Date for the Event"
        variant="outlined"
        value={event.Date}
        onChange={(event) => {
          const date = event.target.value;
          setEvent((prevSetData) => ({
            EventTitle: prevSetData.EventTitle,
            EventDescription: prevSetData.EventDescription,
    HostName1:prevSetData.HostName1 ,
    HostPosition1: prevSetData.HostPosition1,
    Date: date,
    HostName2:prevSetData.HostName2,
    HostPosition2: prevSetData.HostPosition2,
    Status: prevSetData.Status,
          }));
        }}
      />
      <br></br>
      {url.EventPhoto ? <img src={url.EventPhoto} alt="author" /> : <div></div>}
      <Button
        onClick={handleOpenEvent.bind(this)}
        variant="contained"
        color="primary"
      >
        Add Event Image
      </Button>
      <DropzoneDialog
        open={state.Event}
        onSave={handleSaveEventUrl.bind(this)}
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
