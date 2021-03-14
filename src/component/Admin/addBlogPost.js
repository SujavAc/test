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

export default function AddBlogPost() {
  const classes = useStyles();
  const [blog, setBlog] = useState({
    BlogTitle: "",
    BlogDescription:'',
    Category:'',
    AuthorName:'',
    Paragraph1:'',
    Description1:'',
    Paragraph2:'',
    Description2:'',
    Paragraph3:'',
    Description3:'',

  });
  const [url,setUrl]= useState({AuthorUrl: "",
  BlogUrl:'',});
  const [image, setImage] = useState('');
  const [msg, setMsg] = useState({ errMessage: "", successMsg: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [state, setState] = useState({blog:false,author:false});

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setState({blog:false,author:false});
  };
  const handleSaveAuthorUrl = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);
    
    const uploadImage = firebaseStorage
    .ref(`Blog/${image.name}`)
    .put(image);
    uploadImage.on("state_changed",
    (snapshot)=>{
        console.log("snapshot")
    },
    (error)=>{
        console.log(error)
    },
    ()=>{
        firebaseStorage.ref("Blog").child(image.name).getDownloadURL().then(url=>{
            setUrl((prevSetData)=>({
                AuthorUrl:url,
                BlogUrl:prevSetData.BlogUrl,
            }));
            setImage('');
        })
    })
  };
  const handleSaveBlogUrl = (files) => {
    //Saving files to state for further use and closing Modal.
    const image = files[0];
    setImage(image);
    setState(false);
    
    const uploadImage = firebaseStorage
    .ref(`Blog/${image.name}`)
    .put(image);
    uploadImage.on("state_changed",
    (snapshot)=>{
        console.log("snapshot")
    },
    (error)=>{
        console.log(error)
    },
    ()=>{
        firebaseStorage.ref("Blog").child(image.name).getDownloadURL().then(url=>{
            setUrl((prevSetData)=>({
                AuthorUrl:prevSetData.AuthorUrl,
                BlogUrl:url,
            }));
            setImage('');
        })
    })
  };
  const handleOpenBlog = () => {
    setState({blog:true,author:false});
  };
  const handleOpenAuthor = () => {
    setState({author:true,blog:false});
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenSnackbar(true);
    if (!blog.BlogTitle || !blog.BlogDescription || !blog.Category || !blog.Paragraph1 || !blog.Description1 || !url.AuthorUrl ||!url.BlogUrl ){
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
                .collection("Blog")
                .add({
                  Blogtitle:blog.BlogTitle,
                  BlogDescription:blog.BlogDescription,
                  Category:blog.Category,
                  AuthorName:blog.AuthorName,
                  Date:new Date().toLocaleString(),
                  Paragraph1:blog.Paragraph1,
                  Description1:blog.Description1,
                  Paragraph2:blog.Paragraph2,
                  Description2:blog.Description2,
                  Paragraph3:blog.Paragraph3,
                  Description3:blog.Description3,
                  AuthorUrl:url.AuthorUrl,
                  BlogUrl:url.BlogUrl,
                })
                .then((docRef) => {
                    setMsg({
                        successMsg: "Successfully created the banner for popular course",
                      });
                  setBlog({
                    BlogTitle: "",
    BlogDescription:'',
    Category:'',
    AuthorName:'',
    Paragraph1:'',
    Description1:'',
    Paragraph2:'',
    Description2:'',
    Paragraph3:'',
    Description3:'',

                  });
                  setUrl({
                      BlogUrl:'',
                      AuthorUrl:'',
                  });
                })
                .catch((error) => {
                    setMsg({
                        errMessage: "Error creating banner for Popular course:",error,
                      });
                  
                 })
    //         );
    //     }
    //   );
     
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      Post Blog from here
      <TextField
        id="outlined-basic"
        label="BlogTitle"
        variant="outlined"
        value={blog.BlogTitle}
        onChange={(event) => {
          const blogTitle = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: blogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="BlogDescription"
        variant="outlined"
        value={blog.BlogDescription}
        onChange={(event) => {
          const blogDescription = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: blogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Category"
        variant="outlined"
        value={blog.Category}
        onChange={(event) => {
          const category = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Author Name"
        variant="outlined"
        value={blog.AuthorName}
        onChange={(event) => {
          const authorName = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:authorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Paragraph1"
        variant="outlined"
        value={blog.Paragraph1}
        onChange={(event) => {
          const paragraph1 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Description of Paragraph1"
        variant="outlined"
        value={blog.Description1}
        onChange={(event) => {
          const description1 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Paragraph2"
        variant="outlined"
        value={blog.Paragraph2}
        onChange={(event) => {
          const paragraph2 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Description of Paragraph2"
        variant="outlined"
        value={blog.Description2}
        onChange={(event) => {
          const description2 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Paragraph3"
        variant="outlined"
        value={blog.Paragraph3}
        onChange={(event) => {
          const paragraph3 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:paragraph3,
            Description3:prevSetData.Description3,
          }));
        }}
      />
      <br></br>
      <TextField
        id="outlined-basic"
        label="Description of Paragraph3"
        variant="outlined"
        value={blog.Description3}
        onChange={(event) => {
          const description3 = event.target.value;
          setBlog((prevSetData) => ({
            BlogTitle: prevSetData.BlogTitle,
            BlogDescription: prevSetData.BlogDescription,
            Category: prevSetData.Category,
            AuthorName:prevSetData.AuthorName,
            Paragraph1:prevSetData.Paragraph1,
            Description1:prevSetData.Description1,
            Paragraph2:prevSetData.Paragraph2,
            Description2:prevSetData.Description2,
            Paragraph3:prevSetData.Paragraph3,
            Description3:description3,
          }));
        }}
      />
      <br></br>
      {url.BlogUrl ? (<img src={url.BlogUrl} alt="author" />):(<div></div>)}
      <Button
        onClick={handleOpenBlog.bind(this)}
        variant="contained"
        color="primary"
      >
        Add Blog Image
      </Button>
      <DropzoneDialog
        open={state.blog}
        onSave={handleSaveBlogUrl.bind(this)}
        acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose.bind(this)}
      />
      <br></br>
      {url.AuthorUrl ? (<img src={url.AuthorUrl} alt="author" />):(<div></div>)}
      <Button
        onClick={handleOpenAuthor.bind(this)}
        variant="contained"
        color="primary"
      >
        Add  Author Image
      </Button>
      <DropzoneDialog
        open={state.author}
        onSave={handleSaveAuthorUrl.bind(this)}
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
