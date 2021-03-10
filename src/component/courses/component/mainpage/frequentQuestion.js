import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding:theme.spacing(1),
    
  },
  date: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding:theme.spacing(1),
  },
  header:{
    justifyContent:'space-between',
    padding:theme.spacing(1),
  }
}));

export default function FrequentQuestion(props) {
  const classes = useStyles();
  const [question, setQuestion] = React.useState({ data: [] });
  const [loading, setLoading] = React.useState(true);
  
 

  React.useEffect(() => {
    const Title = new FormData();
  Title.append("Title", props.Title);
    Axios.post(
      "http://localhost:81/Webandy/webandy/src/database/vetCourse.php", Title
    )
      .then((response) => {
        setQuestion({ data: response.data });
        setLoading(false);
        
        
      })
      .catch((err) => console.log(err));
  }, [question.data,props.Title]);

  

  return (
    <div className={classes.root}>
        {loading ? (
            <LinearProgress />
      ) : question.data === 0 ? (
        <Typography gutterBottom variant="h6" component="h2">
        <p>
          
          <b>There are no recent Student queries Yet.</b> 
        </p>
      </Typography>
      ):(
          <div>
        {question.data.map((value, index) => (
            <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.header}
            >
             
              <Typography className={classes.heading} color="textPrimary">{value.Question}</Typography>
               
               
              
              <Typography color='primary' className={classes.date}>{value.Date}</Typography>
               
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='textSecondary'>
                {value.Answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        
      </div>
      )}
    </div>
  );
}