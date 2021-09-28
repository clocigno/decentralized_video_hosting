import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import React, {useState, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import drizzle from '../redux/drizzle'

export default function WithdrawlForm({balance}) {
  const [open, setOpen] = useState(false);
  const [userInput, setUserInput] = useState('')
  
  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleUserInput = (_userInput) => {
    setUserInput(_userInput)
  }

  const handleSubmit = useCallback(
    () => {
      const contractMethod = drizzle.contracts['UserFactory'].methods['withdraw']
      contractMethod.cacheSend(userInput)
      setUserInput('')
      handleClose()
    },
    [userInput],
  );

  return (
    <div>
      <Button
        onClick={handleClickOpen} 
        color="primary"
        style={{ marginRight: 40 }}
      >
        WITHDRAW
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Withdraw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Current Smart Contract Balance: {balance} ETH
            <br />
            Enter the Amount in Wei that you would like to withdraw: 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="tip"
            label="Amount in Wei"
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
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
