import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  export default function TransitionsSnackbar() {
    const [state, setState] = React.useState({
      open: false,
      Transition: Fade,
    });
  
    const handleClick = (Transition) => () => {
      setState({
        open: true,
        Transition,
      });
    };
  
    const handleClose = () => {
      setState({
        ...state,
        open: false,
      });
    };
  
    return (
      <div>
        
        <Button onClick={handleClick(SlideTransition)}>Slide Transition</Button>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message="I love snacks"
          key={state.Transition.name}
        />
      </div>
    );
  }