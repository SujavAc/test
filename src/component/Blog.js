import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FilterListIcon from "@material-ui/icons/FilterList";
import Collapse from "@material-ui/core/Collapse";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Grid from '@material-ui/core/Grid';
import NavBar from '../component/navbar';
import BlogData from '../Pages/blognavigation';
import {fireStore} from '../util/firebase';

const useStyles = makeStyles(theme=>({
  root: {
    paddingTop:theme.spacing(16),
    width: "auto",
    height: "auto",
    padding:theme.spacing(2),
  },
  filter: {
    display: "flex",
    justifyContent:'center',
    alignContent:'center',
  },
  grid:{
    flexGrow:1,
  },
}));

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState(false);
  const [data, setData] = React.useState({ Data: [] });
  //const [loading, setLoading] = React.useState(true);
  const [form,setForm] = React.useState({title:'',filter:''});
  const[recent,setRecent]= React.useState('');

  const handleClick = () => {
    setSearch(!search);
  };
  React.useEffect(() => {
    fireStore.collection('Blog').onSnapshot(onCollectionUpdate);
  }, []);

  const onCollectionUpdate = (querySnapshot) => {
    const blog = [];
    querySnapshot.forEach((doc) => {
      const { AuthorName, Blogtitle, Category, Date  } = doc.data();
      blog.push({
        key: doc.id,
        doc,
        AuthorName,
        Blogtitle,
        Category,
        Date,
       
      });
    });
    setData({
      Data: blog,
    });
    
  };

  const recentBlog = () =>{
    const date = new Date().toLocaleString();
    setRecent(date);
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
      >
        <BottomNavigationAction label="Recents" onClick={recentBlog} icon={<RestoreIcon />} />
        <BottomNavigationAction
          label="Filter"
          icon={<FilterListIcon />}
          onClick={handleClick}
        />
      </BottomNavigation>
      
        <Collapse in={search} timeout="auto" unmountOnExit >

       
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.filter}>
          <Autocomplete
            id="blog-demo"
            style={{ margin: 5}}
            options={data.Data.map((option) => option.AuthorName)}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                label="By Author Name"
                variant="outlined"
                onSelect={(event)=>{
                  const Authorname = event.target.value;
                  setForm({
                    title:'AuthorName',
                    filter:Authorname,
                  });
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          
          
          
      
            <Autocomplete
            id="country-select-demo"
            style={{  margin: 5 }}
            options={data.Data.map((option) => option.Blogtitle)}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                label="By Title"
                variant="outlined"
                onSelect={(event)=>{
                  const Title = event.target.value;
                  setForm(prevSetData=>({
                    title:'Blogtitle',
                    filter:Title,
                  }));
                  
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
            
          
          <Autocomplete
            id="country-select-demo"
            style={{ margin: 5 }}
            options={data.Data.map((option) => option.Date)}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                label="By Date"
                variant="outlined"
                onSelect={(event)=>{
                  const Date = event.target.value;
                  setForm(prevSetData=>({
                    title:'Date',
                    filter:Date,
                  }));
                  console.log(form);
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Autocomplete
            id="country-select-demo"
            style={{margin: 5 }}
            options={data.Data.map((option,index) => option.Category)}
            classes={{
              option: classes.option,
            }}
            autoHighlight
            renderInput={(params) => (
              <TextField
                {...params}
                label="By Category"
                variant="outlined"
                onSelect={(event)=>{
                  const Category = event.target.value;
                  setForm(prevSetData=>({
                    title:'Category',
                    filter:Category,
                  }));
                  console.log(form);
                }}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          </div>
          </Grid>
        </Grid>
        </Collapse>
        <BlogData Title={(form.title)} Filter={(form.filter)} Recent={recent} />
    </div>

  );
}
