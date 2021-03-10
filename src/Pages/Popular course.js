import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'react-image-file';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Page from './pages';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
root: {
    flexGrow:1,
    paddingTop:theme.spacing(16),
    padding:theme.spacing(2),
    
  },
  media: {
    height: 400,
    width:450,
   },
   
}));



export default function PCourse(){
    const classes = useStyles();
    const[courseList,setCourseList]= useState({course:[]});

useEffect(()=>{
  
        Axios.post('http://172.26.34.83:81/Webandy/webandy/src/database/getCourses.php')
        .then((response)=>{
          
            setCourseList({course:response.data});
          console.log(response);  
          }).catch(err=>console.log(err))
        },[])
        //console.log(courseList);
       
return(
    <div className={classes.root}>
      <Grid container spacing={3}>
      
      {courseList.course.map((value,index)=>{
        const image = (value.Image);
        return(
          
          <Grid item xs={6} >
            <Card key={index.ID}>
            <Image src={{uri:`data:image/jpeg;base64,${value.Image}`}} />
              
              
                <CardMedia key={index.ID}
                className={classes.media}
                  title='Sujav'
                  image={`data:image/jpeg;base64,${image}`}
                  
                />
                {/* <img src={`data:image/jpeg;base64,${image}`}/> */}
                
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {value.Title}
                    
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {value.Description}<br></br>
                  </Typography>
                  <Typography variant="h6" color="textSecondary" component="p">
                    {value.FeeStructure}<br></br>
                  </Typography>
                  <Typography variant="h24" color="primary" component="p">
                    {value.CarrerPathway}<br></br>
                  </Typography>
                </CardContent>
              
              <CardActions>
                <Link to ={value.Title} >
                <Button size="small" color="primary">
                  Learn More
                </Button>
                </Link>
              </CardActions>
              
            </Card> 
            </Grid>
           
        )
        
        
      })}
      
      </Grid>
   
      
        
   
        <Page  
        Title={'Welcome To Popular Courses'} 
        image1={"https://i.redd.it/1vemqfhuf9u41.jpg"}
        pT2={
          "Don’t leave your options to chance, speak with the AECC Global experts before you make a big decision"
        }
        p2={
          "As an international student, choosing the right course of study for you in Australia is an important decision. It’s not only money, it’s also time that you can’t get back if you choose a course or institution here that doesn’t meet your study or long term career objectives. Talking with an Education Counsellor from AECC Global can help. You can tell us your career goals and we’ll give you expert guidance on the study choices that will get you there. We can help, whichever stage you’re at: Considering university or further courses of education in Australia? Want to know about different institutions in Australia and how they compare so you can make a good choice? Need assistance with student visa? It doesn’t matter, if you’ve studied before or not, we can help international students at every level, from university preparation courses right through to PhD and Master’s level research."
        }
        image2={
          "https://ih0.redbubble.net/image.8712023.7976/flat,1000x1000,075,f.jpg"
        }
        pT3={"Seek advice from an education industry-leader"}
        p3={
          "With almost 10 years’ experience and a wonderful team of QEAC Certified Education Counsellors, AECC Global can give you all the guidance and services you need to study in Australia. From course selection and managing your study application to visa advice and application services through our in-house migration agents to extensive support for health cover, taxation, accommodation and more, we are here for international students. We will start with learning about you and your goals, then our friendly Education Counsellors will help you find a fantastic course at an institution that gets you where you want to go. We’ll help arrange everything, from your course application to offer letter and study visa. We will also guide you on accommodation health cover and insurance. We will also search for applicable financial assistance and scholarships you could get. We know that leaving your home country to study overseas is an exciting journey – and we’ll be with you the whole way whenever you need advice or assistance throughout your stay in Australia."
        }
        />
        
    </div>
)
}