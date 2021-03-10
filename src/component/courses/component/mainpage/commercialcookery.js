import React from 'react';
import VetCoursePage from './vetCoursePage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
}));
export default function CommercialCookery(){
  const classes = useStyles();
    

return(
    <div className={classes.root}>
        
            <VetCoursePage 
            Title={'Commercial Cookery'}
            
            Image={'https://www.tmg.edu.au/hs-fs/hubfs/Commercial%20Cookery.jpg?width=1800&height=1200&name=Commercial%20Cookery.jpg'}
              />
              
       
        
    </div>
)
}