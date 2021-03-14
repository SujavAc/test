import React, { useState, useMemo } from "react";
import {
  withStyles,
  makeStyles,
  
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import countryList from "react-select-country-list";
import Button from "@material-ui/core/Button";
//import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import FirebaseDb from '../util/firebase';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const question = [
  {
    label: "Visa Status",
  },
  {
    label: "Visa Update",
  },
  {
    label: "Course Selection",
  },
  {
    label: "Fee Structure",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "30ch",
    },
    close: {
      padding: theme.spacing(0.5),
    },
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(4),
  },
  error: {
    color: "#ff0000",
  },
  success: {
    color: "#00ff00",
  },
  // floatIcon: {
  //   "& > *": {
  //     margin: theme.spacing(1),
  //     position: "fixed",
  //     right: "0%",
  //     top: "50%",
  //   },
  // },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

function DialogForm(props) {
  const { onClose, selectedValue, open } = props;
  const classes = useStyles();
  const countries = useMemo(() => countryList().getData(), []);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    passport: "",
    question: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [msg, setMsg] = useState({ errMsg: "", successMsg: "" });

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  var phone = new RegExp(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i
  );

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };
  const handleClose = () => {
    onClose(selectedValue);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    setOpenSnackbar({
      open: true,
    });
    if (
      !data.firstname ||
      !data.lastname ||
      !data.email ||
      !data.number ||
      !data.passport ||
      !data.question ||
      !data.message
    ) {
      setMsg({
        errMsg: "Fill up all data",
      });
    } else if (!pattern.test(data.email)) {
      setMsg({
        errMsg: "Not valid Email...!! Try again",
      });
    } else if (!phone.test(data.number)) {
      setMsg({
        errMsg: "Try harder...!!! use valid phone number",
      });
    } else {
      FirebaseDb.child('Expert Enquiry').push(
        data,
        err=>{
          if (err)
          console.log(err);
        }
      ).then(()=>{
        setMsg({
          successMsg:'Your enquiry for Expert evaluation have been submitted'
        });
        setData({
          firstname: "",
          lastname: "",
          email: "",
          number: "",
          passport: "",
          question: "",
          message: "",
        })
      }).catch(error=>{
        console.log(error);
      })
      // const formData = new FormData();
      // formData.append("firstname", data.firstname);
      // formData.append("lastname", data.lastname);
      // formData.append("email", data.email);
      // formData.append("number", data.number);
      // formData.append("passport", data.passport);
      // formData.append("question", data.question);
      // formData.append("message", data.message);
      // formData.append('formdata','formdata');

      // Axios.post(
      //   "http://172.26.34.83:81/Webandy/webandy/src/database/form.php",
      //   formData
      // )
      //   .then((res) => {
      //     console.log(res);
      //     setMsg({
      //       successMsg: res.data,
      //     });
      //   })
      //   .catch((err) => {
      //     setMsg({
      //       errMessage: err.message,
      //     });
      //   });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Seek help with experts</DialogTitle>

      <form className={classes.root} noValidate>
        <ValidationTextField
          className={classes.margin}
          label="First Name"
          required
          variant="outlined"
          value={data.firstname}
          onChange={(event) => {
            const FirstName = event.target.value;
            setData((prevSetData) => ({
              firstname: FirstName,
              lastname: prevSetData.lastname,
              email: prevSetData.email,
              number: prevSetData.number,
              passport: prevSetData.passport,
              question: prevSetData.question,
              message: prevSetData.message,
            }));
          }}
          id="validation-outlined-input"
        />
        <ValidationTextField
          className={classes.margin}
          label="Last Name"
          required
          variant="outlined"
          value={data.lastname}
          id="validation-outlined-input"
          onChange={(event) => {
            const LastName = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: LastName,
              email: prevSetData.email,
              number: prevSetData.number,
              passport: prevSetData.passport,
              question: prevSetData.question,
              message: prevSetData.message,
            }));
          }}
        />
        <ValidationTextField
          className={classes.margin}
          label="Email Address"
          required
          variant="outlined"
          value={data.email}
          id="validation-outlined-input"
          onChange={(event) => {
            const Email = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: prevSetData.lastname,
              email: Email,
              number: prevSetData.number,
              passport: prevSetData.passport,
              question: prevSetData.question,
              message: prevSetData.message,
            }));
          }}
        />
        <ValidationTextField
          className={classes.margin}
          label="Phone Number"
          required
          variant="outlined"
          value={data.number}
          id="validation-outlined-input"
          onChange={(event) => {
            const Number = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: prevSetData.lastname,
              email: prevSetData.email,
              number: Number,
              passport: prevSetData.passport,
              question: prevSetData.question,
              message: prevSetData.message,
            }));
          }}
        />
        <TextField
          id="standard-select-country"
          select
          label="Passport issued"
          value={data.passport}
          options={countries}
          helperText="Please select the Country Name"
          onChange={(event) => {
            const Passport = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: prevSetData.lastname,
              email: prevSetData.email,
              number: prevSetData.number,
              passport: Passport,
              question: prevSetData.question,
              message: prevSetData.message,
            }));
          }}
        >
          {countries.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="standard-select-currency"
          select
          label="Enquiry Topic"
          value={data.question}
          helperText="Select the related topic "
          onChange={(event) => {
            const Question = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: prevSetData.lastname,
              email: prevSetData.email,
              number: prevSetData.number,
              passport: prevSetData.passport,
              question: Question,
              message: prevSetData.message,
            }));
          }}
        >
          {question.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          value={data.message}
          variant="outlined"
          onChange={(event) => {
            const Message = event.target.value;
            setData((prevSetData) => ({
              firstname: prevSetData.firstname,
              lastname: prevSetData.lastname,
              email: prevSetData.email,
              number: prevSetData.number,
              passport: prevSetData.passport,
              question: prevSetData.question,
              message: Message,
            }));
          }}
        />

        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={onSubmitForm}
        >
          Send
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          {msg.errMsg ? (
            <Alert onClose={handleCloseSnackbar} severity="error">
              {msg.errMsg}
            </Alert>
          ) : (
            <Alert onClose={handleCloseSnackbar} severity="success">
              {msg.successMsg}
            </Alert>
          )}
        </Snackbar>
      </form>

      {/* {msg.errMsg ?(
        <div className={classes.error}>{msg.errMsg}</div>
      ):(
        <div className={classes.success}>{msg.successMsg}</div>
      )} */}
    </Dialog>
  );
}

DialogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function Form(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className={classes.floatIcon}>
      <Fab variant="extended" onClick={handleClickOpen}>
        {props.Title}
      </Fab>
      <DialogForm
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
