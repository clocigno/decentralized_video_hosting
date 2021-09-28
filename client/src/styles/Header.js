import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useHeaderStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: 'white',
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color: 'black',
    },
    hide: {
        display: 'none',
    },
    box1: {
        flexGrow: '1',
        justifyContent: 'flex-start',
    },
    box2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        marginRight: 20,
    },
    odyseeLogo: {
        width: theme.spacing(30),
        height: theme.spacing(7),
    },
    largeText: {
        color: 'black',
        marginRight: 20,
    },
    ethLogo: {
        height: 20,
    },
}));

export default useHeaderStyles;