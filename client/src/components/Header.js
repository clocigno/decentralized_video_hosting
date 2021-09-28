import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box'
import UploadForm from './UploadForm'
import { drawerChange } from '../redux/slices/drawer';
import { drizzleReactHooks } from '@drizzle/react-plugin'
import { drizzleStore } from '../redux/drizzle';
import WithdrawlForm from './WithdrawlForm';
import useHeaderStyles from '../styles/Header';
import NumberFormat from "react-number-format";
import SignUpForm from './SignUpForm.js';

export default function Header() {
  const classes = useHeaderStyles();

  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    account: drizzleState.accounts[0],
    drawer: drizzleState.drawer
  }));

  const { useCacheCall } = drizzleReactHooks.useDrizzle();

  const user = useCacheCall('UserFactory', 'users', drizzleState.account);
  const userName = user && user.name;
  const balance = user && user.balance / 1000000000000000000;

  const handleDrawerChange = () => {
    drizzleStore.dispatch(drawerChange())
  };

  return (
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drizzleState.drawer.open,
        })}
      >
        {userName === '' && 
          <SignUpForm />}  
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerChange}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: drizzleState.drawer.open,
            })}>
          <MenuIcon />
          </IconButton>
          <Box className={classes.box1}>
            <img className={classes.odyseeLogo}
                 src='https://ipfs.infura.io/ipfs/Qma29NfyRrVR4oxfk1LnKcVgYWhcCCv2tdeZTe9hkCKPhN'
                 alt='Odysee Logo'/>
          </Box>
          <UploadForm />
          {userName && 
            <Typography className={classes.largeText}
                        variant='h6'>
              {userName}
            </Typography>}
          <Box className={classes.box2}>
            <img className={classes.ethLogo}
                 src='https://ipfs.infura.io/ipfs/QmVpnipUpdSA8YiqVwijhyUvuPeeZrkvu8N9doTMhwewy2'
                 alt='ethereum logo'/>
            <Typography className={classes.largeText}
                        variant='h6'>
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={balance}
                prefix=""
                decimalSeparator="."
                displayType="text"
                type="text"
                thousandSeparator={true}
                allowNegative={false}
                decimalScale={6}
                fixedDecimalScale={true} />
            </Typography>
            <WithdrawlForm balance = {balance} />
          </Box>
        </Toolbar>
      </AppBar>
  );
}
