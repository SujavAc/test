import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { fireStore } from '../../../util/firebase';
import ExpertOpinion from '../../../Pages/form';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop:theme.spacing(1),
    
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

export default function SimpleAccordion(props) {
  const classes = useStyles();
  const [question,setQuestion] = React.useState({ data: [] });
  const [loading,setLoading] = React.useState(true);


  React.useEffect(() => {
    if(props.Title){
      fireStore.collection('FAQs').where(props.Filter,'==',props.Title).onSnapshot(onCollectionUpdate);
    }else{
      fireStore.collection('FAQs').onSnapshot(onCollectionUpdate);
    }
    
  }, [question.data,props.Filter,props.Title]);

  const onCollectionUpdate = (querySnapshot) => {
    const faqs = [];
    querySnapshot.forEach((doc) => {
      const { Question, Answer, Date  } = doc.data();
      faqs.push({
        key: doc.id,
        doc,
        Question,
        Answer,
        Date,
       
      });
    });
    setQuestion({
      data: faqs,
    });
    setLoading(false);
    
  };

  return (
    <div className={classes.root}>
        {loading ? (
            <LinearProgress />
      ) : question.data.length === 0 ? (
        <Typography gutterBottom variant="h6" component="h2">
        <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.header}
            >
             
              <Typography variant="h5" align="center">No querry for this Particular Course</Typography>
          </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
                Be the first one to send out any querries you may have.
              </Typography>
              <br></br>
              <Typography align="left">
                <ExpertOpinion Title={'Send us any Question You may have'}/>
                </Typography>
            </AccordionDetails>
          </Accordion>
      </Typography>
      ):(
          <div>
        {question.data.map((value, index) => (
            <Accordion key={value.key}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.header}
            >
             
              <Typography className={classes.heading}>{value.Question}</Typography>
               
               
              
              <Typography color='primary' className={classes.date}>{value.Date}</Typography>
               
            </AccordionSummary>
            <AccordionDetails>
              <Typography paragraph>
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