import { makeStyles } from '@material-ui/core/styles';

const useVideoPlayerStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      box: {
          width: '50%',
          display: 'flex',
          alignItems: 'baseline',
          marginBottom: -10,
      },
      video: {
          marginBottom: 20,
          width: "70%",
          height: 700,
          objectFit: 'cover',
      },
      card: {
          width: '70%',
          marginBottom: 20,
        },
      title: {
          display: 'block',
          alignItems: 'center',
          fontSize: '200%',
          fontWeight: 300,
        },
      text: {
          display: 'block',
          alignItems: 'center',
          fontSize: '150%',
      },
      form: {
          '& .MuiTextField-root': {
              margin: theme.spacing(1),
              width: '25ch',
          },
      },
      textField: {
          width: '100%',
      },
      commentCard: {
          marginBottom: 10,
          border: "none", 
          boxShadow: "none" 
      },
}));

export default useVideoPlayerStyles;