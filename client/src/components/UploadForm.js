import {useState, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box';
import drizzle from '../redux/drizzle'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileBuffer, setFileBuffer] = useState(null)
  const [userInput, setUserInput] = useState('')

  const { create } = require('ipfs-http-client')
  const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleUserInput = (_userInput) => {
    setUserInput(_userInput)
  }

  const captureFile = (_file) => {
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(_file)
    reader.onloadend = () => {
      setFileBuffer(Buffer(reader.result))
    }
  }

  const uploadVideo = useCallback(
    async () => {
      const result = await ipfs.add(fileBuffer)
      const hash = result.path
      const contractMethod = drizzle.contracts.VideoFactory.methods['postVideo']
      contractMethod.cacheSend(hash, userInput)
    },
    [fileBuffer, ipfs, userInput],
  );
  
  const handleSubmit = useCallback(
    async () => {
      setLoading(true)
      await uploadVideo()
      setLoading(false)
      setUserInput('')
      handleClose()
    },
    [uploadVideo],
  );

  return (
    <div>
      <CloudUploadOutlinedIcon
        onClick={handleClickOpen} 
        color="primary"
        style={{ marginRight: 40 }}
        />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Upload Video</DialogTitle>
        <DialogContent> 
          <input id="image-file" 
            type="file" 
            onChange={(e) => captureFile(e.target.files[0])}
          />
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(e) => handleUserInput(e.target.value)}
          />
        </DialogContent> 
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {!loading ? 'Upload' : 
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box> 
            }
          </Button>
        </DialogActions> 
      </Dialog>
    </div>
  );
}
