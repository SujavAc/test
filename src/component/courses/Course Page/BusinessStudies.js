import React from 'react';
import Page from './page';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
}));
export default function BusinessStudies(){
  const classes = useStyles();
    

return(
    <div className={classes.root}>
        
            <Page 
            Title={'Business Studies'}
            Image={'https://thumbs.dreamstime.com/b/notepad-stationery-white-background-planner-business-study-fans-143353974.jpg'}
              />
       
        
    </div>
)
}