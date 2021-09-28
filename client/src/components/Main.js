import VideoPlayer from './VideoPlayer';
import { Route, Switch } from "react-router-dom";
import VideoGrid from './VideoGrid';
import useMainStyles from '../styles/Main';

export default function Main() {
  const classes = useMainStyles();

  return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path = '/' exact>
            <VideoGrid />
          </Route>
          <Route path = '/subscriptions'>
            <VideoGrid />
          </Route>
          <Route path = '/@:poster'>
            <VideoGrid />
          </Route>
          <Route path = '/$/:ipfsHash'>
             <VideoPlayer />
          </Route> 
        </Switch>
      </main>
  );
}
