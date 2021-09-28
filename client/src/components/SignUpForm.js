import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, {useState, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import drizzle from '../redux/drizzle'

export default function FormDialog() {
  const [open, setOpen] = useState(true);
  const [userInput, setUserInput] = useState('')
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleUserInput = (_userInput) => {
    setUserInput(_userInput)
  }

  const handleSubmit = useCallback(
    () => {
      const contractMethod = drizzle.contracts['UserFactory'].methods['createUser']
      contractMethod.cacheSend(userInput)
      setUserInput('')
      handleClose()
    },
    [userInput],
  );

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To sign up with odysee, please enter a User ID
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User ID"
            type="text"
            fullWidth
            onChange={(e) => handleUserInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
