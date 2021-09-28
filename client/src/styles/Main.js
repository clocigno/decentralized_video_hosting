import { makeStyles } from '@material-ui/core/styles';

const useMainStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginLeft: 100
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default useMainStyles;