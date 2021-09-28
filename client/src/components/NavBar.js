import clsx from 'clsx';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box'
import HomeIcon from '@material-ui/icons/Home';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { drawerChange } from '../redux/slices/drawer';
import { drizzleStore } from '../redux/drizzle';
import { Link } from "react-router-dom";
import useNavBarStyles from '../styles/NavBar';

export default function NavBar() {
  const classes = useNavBarStyles();
  const theme = useTheme();
  
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    drawer: drizzleState.drawer,
  }))

  const handleDrawerChange = () => {
    drizzleStore.dispatch(drawerChange())
  };

  return (
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drizzleState.drawer.open,
          [classes.drawerClose]: !drizzleState.drawer.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drizzleState.drawer.open,
            [classes.drawerClose]: !drizzleState.drawer.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerChange}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link to= '/' 
                  style={{ textDecoration: 'none' }}> 
                <ListItem >
                    <ListItemIcon>
                        <Box>
                        <HomeIcon />
                        {theme.direction === 'rtl' && <Typography>Home</Typography>}
                        </Box>
                    </ListItemIcon>
                    <ListItemText primary={'Home'} />
                </ListItem>
            </Link>
            <Link to= '/subscriptions'
                  style={{ textDecoration: 'none' }}> 
                <ListItem >
                    <ListItemIcon>
                        <Box>
                        <FavoriteBorder />
                        {theme.direction === 'rtl' && <Typography>Subscriptions</Typography>}
                        </Box>
                    </ListItemIcon>
                    <ListItemText primary={'Subscriptions'} />
                </ListItem>
            </Link>
        </List>
      </Drawer>
  );
}
