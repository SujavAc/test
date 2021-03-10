import React, { useState, useMemo } from "react";
import {
  
  withStyles,
  makeStyles,
  
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import countryList from "react-select-country-list";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Fade from "@material-ui/core/Fade";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    
    color: '#f5f5f5',
    
    "& > *": {
      margin: theme.spacing(1),
      width: "30ch",
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "30ch",
      
    },
    close: {
      padding: theme.spacing(0.5),
    },
  },
  
  error: {
    color: "#ff0000",
  },
  success: {
    color: "#00ff00",
  },
  floatIcon: {
    "& > *": {
      margin: theme.spacing(1),
      position: "fixed",
      right: "0%",
      top: "50%",
    },
  },
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

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}
export default function OpenForm() {
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
  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  });
  const [msg, setMsg] = useState({ errMsg: "", successMsg: "" });

  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  var phone = new RegExp(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i
  );

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

  const onSubmitForm = (Transition) => () => {
    setState({
      open: true,
      Transition,
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
      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("lastname", data.lastname);
      formData.append("email", data.email);
      formData.append("number", data.number);
      formData.append("passport", data.passport);
      formData.append("question", data.question);
      formData.append("message", data.message);
      // formData.append('formdata','formdata');

      Axios.post(
        "http://localhost:81/Webandy/webandy/src/database/form.php",
        formData
      )
        .then((res) => {
          console.log(res);
          setMsg({
            successMsg: res.data,
          });
        })
        .catch((err) => {
          setMsg({
            errMessage: err.message,
          });
        });
    }
  };
  // const handleClose = () => {
  //     onClose(selectedValue);
  //   };
  const handleCloseSnackBar = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    
    <div>
      <p><b>Get help form expert in right time.</b><br></br>It's never too late!!!<br></br><b>Contact Us Today</b><br></br><a href="tel:1234567890">
              <AddIcCallIcon />
              12345678
            </a><br></br><b>OR Fill this form today for more Information.</b></p>
      <form className={classes.root} noValidate>
        <ValidationTextField
          className={classes.margin}
          label="First Name"
          required
          variant="outlined"
          defaultValue={data.firstname}
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
          defaultValue={data.lastname}
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
          defaultValue={data.email}
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
          defaultValue={data.number}
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
          defaultValue={data.message}
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
          onClick={onSubmitForm(SlideTransition)}
        >
          Send
        </Button>
      </form>
      <Snackbar
        open={state.open}
        //onClose={handleClose}
        TransitionComponent={state.Transition}
        message={msg.errMsg ? msg.errMsg : msg.successMsg}
        key={state.Transition.name}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={handleCloseSnackBar}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  );
}
