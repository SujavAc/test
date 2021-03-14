import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
// import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { fireStore } from "../../util/firebase";

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

export default function FAQs() {
  const classes = useStyles();
  const [faqs, setFaqs] = useState({
    Question: "",
    Answer: "",
    Category: "",
  });
  
  const [msg, setMsg] = useState({ errMessage: "", successMsg: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

 

  const handleClick = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    if (!faqs.Question || !faqs.Answer || !faqs.Category ) {
      setMsg({
        errMessage: "All field must be filled",
      });
    } else {
              fireStore
                .collection("FAQs")
                .add({
                  Question:faqs.Question,
                  Answer:faqs.Answer,
                  Category:faqs.Category,
                  Date:new Date().toLocaleString(),
                })
                .then((docRef) => {
                  setMsg({
                    successMsg: "Successfully upload FAQs",
                  });
                  
                  setFaqs({
                    Question: "",
    Answer: "",
    Category: "",
                  });
                })
                .catch((error) => {
                  setMsg({
                    errMessage: "Error in saving FAQs, Please Try Again!!!" ,error,
                  });
                  
                })
            
        
      
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      Frwquent Qeustion Form.
      <TextField
        id="outlined-basic"
        label="Question"
        variant="outlined"
        value={faqs.Question}
        onChange={(event) => {
          const question = event.target.value;
          setFaqs((prevSetData) => ({
            Question: question,
            Answer: prevSetData.Answer,
            Category: prevSetData.Category,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="Answer"
        multiline
        variant="outlined"
        value={faqs.Answer}
        onChange={(event) => {
          const answer = event.target.value;
          setFaqs((prevSetData) => ({
            Question: prevSetData.Question,
            Answer:answer,
            Category: prevSetData.Category,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-textarea"
        label="Category"
        variant="outlined"
        value={faqs.Category}
        onChange={(event) => {
          const category = event.target.value;
          setFaqs((prevSetData) => ({
            Question: prevSetData.Question,
            Answer:prevSetData.Answer,
            Category:category,
          }));
        }}
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
