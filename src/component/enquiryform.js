import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
// import Axios from "axios";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {fireStore} from '../util/firebase';

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


function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const classes = useStyles();
  const [data, setData] = useState({ Name: "", Email: "", Message: "" });
  const [msg, setMsg] = useState({ errMessage: "", successMsg: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );

  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClick = e => {
    e.preventDefault();
    setOpenSnackbar(true);
    if (!data.Name || !data.Email || !data.Message) {
      setMsg({
        errMessage: "Fill all the details",
      });
    } else if (!pattern.test(data.Email)) {
      setMsg({
        errMessage: "Use valid Email",
      });
    } else {
      fireStore
                .collection("Enquiry Data")
                .add({
                  Name: data.Name,
                  Email: data.Email,
                  Message: data.Message,
                  Date:new Date().toLocaleString(),
                })
                .then((docRef) => {
                  setMsg({successMsg:"You Enquiry has been delivered"});
                  setData({
                    Name: "",
                    Email: "",
                    Message: "",
                    
                  });
                })
                .catch((error) => {
                  setMsg({errMessage:"Error sending Enquiry, Please Try Again!!!: ", error});
                })
     }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title" align="center">Send Enquiry</DialogTitle>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Full Name"
          variant="outlined"
          value={data.Name}
          onChange={(event) => {
            const name = event.target.value;
            setData((prevSetData) => ({
              Name: name,
              Email: prevSetData.Email,
              Message: prevSetData.Message,
            }));
          }}
        />
        
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={data.Email}
          onChange={(event) => {
            const email = event.target.value;
            setData((prevSetData) => ({
              Name: prevSetData.Name,
              Email: email,
              Message: prevSetData.Message,
            }));
          }}
        />
        
        <TextField
          id="outlined-basic"
          label="Message"
          variant="outlined"
          value={data.Message}
          onChange={(event) => {
            const message = event.target.value;
            setData((prevSetData) => ({
              Name: prevSetData.Name,
              Email: prevSetData.Email,
              Message: message,
            }));
          }}
        />

        <Button color="primary" onClick={handleClick} variant='contained'>
          Submit
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          {msg.errMessage ? (
            <Alert onClose={handleCloseSnackbar} severity="error">{msg.errMessage}</Alert>
          ) : (
            <Alert onClose={handleCloseSnackbar} severity="success">{msg.successMsg}</Alert>
          )}
        </Snackbar>
      </form>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        Send Enquiry
      </Button>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
