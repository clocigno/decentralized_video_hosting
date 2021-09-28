import { makeStyles } from '@material-ui/core/styles';

const useVideoGridStyles = makeStyles((theme) => ({
    gridContainerDiv: {
        flexGrow: 1,
    },
    media: {
        height: 140,
        width: '100%',
        objectFit: 'cover',
    },
    gridCard: {
        height: '100%',
        width: '100%',
    },
}));

export default useVideoGridStyles;