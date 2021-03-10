import React from 'react';
import VetCoursePage from './vetCoursePage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
}));
export default function EarlyChildhood(){
  const classes = useStyles();
    

return(
    <div className={classes.root}>
        
            <VetCoursePage 
            Title={'Early Childhood Education'}
            
            Image={'https://thespoke.earlychildhoodaustralia.org.au/wp-content/uploads/2016/07/Screenshot_2-1.png'}
              />
              
       
        
    </div>
)
}