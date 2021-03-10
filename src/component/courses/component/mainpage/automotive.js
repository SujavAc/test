import React from 'react';
import VetCoursePage from './vetCoursePage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
}));
export default function Automotive(){
  const classes = useStyles();
    

return(
    <div className={classes.root}>
        
            <VetCoursePage 
            Title={'Automotive'}
            
            Image={'https://www.readersdigest.ca/wp-content/uploads/2012/10/ask-your-mechanic-questions.jpg'}
              />
              
       
        
    </div>
)
}