import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Axios from "axios";

//Snackbar

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 370,
    justifyContent: "center",

    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
  confirm: {
    display: "flex",
  },
}));

export default function EventRegisterForm(props) {
  const classes = useStyles();
  const [data,setData] = React.useState({name:'',eamil:'',phone:''});
  const [checked, setChecked] = React.useState(true);
  const [msg, setMsg] = React.useState({ errMsg: "", successMsg: "" });

  //snackbar
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  var pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
  );
  var phone = new RegExp(
    /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i
  );

  const handleRegister  = () => {
    setOpen(true);
    if (
      !data.name ||
      !data.email ||
      !data.phone
      
    ) {
      setMsg({
        errMsg: "All field required !!!",
      });
    }else if(!checked){
        setMsg({
            errMsg:"please Ticked the icon before register !!!",
        })
    } else if (!pattern.test(data.email)) {
      setMsg({
        errMsg: "Not valid Email...!! Try again...",
      });
    } else if (!phone.test(data.phone)) {
      setMsg({
        errMsg: "Try harder...!!! use valid phone number...",
      });
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("eventname",props.Eventname);

      Axios.post(
        "http://172.26.34.83:81/Webandy/webandy/src/database/eventRegister.php",
        formData
      )
        .then((res) => {
          console.log(res);
          console.log(data);
          if(res.data === 'Your have successfully register for event.'){
            setMsg({
                successMsg: res.data,
              });
          }else{
              setMsg({
                  errMsg:res.data,
              })
          }
          
        })
        .catch((err) => {
          setMsg({
            errMessage: err.message,
          });
        });
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography gutterBottom variant="h6" component="h3" color="textPrimary">
        Register here for the Upcoming {props.Eventname}
      </Typography>

      <TextField id="standard-basic" label="Full Name"
      onChange={(event) => {
        const Name = event.target.value;
        setData((prevSetData) => ({
          name: Name,
          email: prevSetData.email,
          phone: prevSetData.phone,
        }));
      }}
      />
      <TextField id="standard-basic" label="Email" 
      onChange={(event) => {
        const Email = event.target.value;
        setData((prevSetData) => ({
          name: prevSetData.name,
          email: Email,
          phone: prevSetData.phone,
        }));
      }}
      />
      <TextField id="standard-basic" label="Phone" 
      onChange={(event) => {
        const Phone = event.target.value;
        setData((prevSetData) => ({
          name: prevSetData.name,
          email: prevSetData.email,
          phone: Phone,
        }));
      }}
      />
      <div className={classes.confirm}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          color="textSecondary"
        >
          I would like to join the Event.
        </Typography>
      </div>
      <Button size="small" color="secondary" variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {msg.errMsg ?(
        
        <Alert onClose={handleClose} severity="error">
          {msg.errMsg}
        </Alert>
      
      ):(
        
        <Alert onClose={handleClose} severity="success">
          {msg.successMsg}
        </Alert>
        
      
        
      )}
      
      </Snackbar>
    </form>
  );
}
