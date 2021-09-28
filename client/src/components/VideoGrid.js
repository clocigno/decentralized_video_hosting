import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { drizzleReactHooks } from '@drizzle/react-plugin'
import { Link, useLocation, useParams } from "react-router-dom";
import drizzle from '../redux/drizzle';
import ReactTimeAgo from 'react-time-ago'
import useVideoGridStyles from '../styles/VideoGrid';
import { useState, useEffect } from 'react';

export default function VideoGrid() {
  const classes = useVideoGridStyles();
  
  const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
    contracts: drizzleState.contracts,
    account: drizzleState.accounts[0]
  }));

  const location = useLocation();
  const { poster } = useParams();

  const { useCacheCall } = drizzleReactHooks.useDrizzle();

  const latestVideos  = useCacheCall('VideoFactory', 'getLatestVideos');
  const subscriptions = useCacheCall('UserFactory', 'getSubscriptions', drizzleState.account);
  
  const [subscribedVideos, setSubscribedVideos] = useState(undefined);
  const [videosByPoster, setVideosByPoster] = useState(undefined);

  useEffect(() => {
    if (subscriptions) {
      const instance = drizzle.contracts['VideoFactory']
      const cacheKey = instance.methods['getSubscribedVideos'].cacheCall(subscriptions)
      const cache = drizzleState.contracts['VideoFactory']['getSubscribedVideos'][cacheKey]
      setSubscribedVideos(cache && cache.value)
    }
  }, [subscriptions, drizzleState.contracts])

  useEffect(() => {
    if (poster) {
      const instance = drizzle.contracts['VideoFactory']
      const cacheKey = instance.methods['getVideosByPoster'].cacheCall(poster)
      const cache = drizzleState.contracts['VideoFactory']['getVideosByPoster'][cacheKey]
        setVideosByPoster(cache && cache.value)
    }
  }, [poster, drizzleState.contracts])

  const getUserName = (poster) => {
    const instance = drizzle.contracts['UserFactory']
    const cacheKey = instance.methods['users'].cacheCall(poster)
    const cache = drizzleState.contracts['UserFactory']['users'][cacheKey]
    return cache && cache.value.name
  }
  
  const path = location.pathname;
  var videos = undefined;

  switch (path) {
    case '/':
      videos = latestVideos;
      break;
    case '/subscriptions':
      videos = subscribedVideos;
      break;
    default:
      videos = videosByPoster;
      break;
  }

  return (
    <div className={classes.gridContainerDiv}>
      {videos &&
      <Grid container spacing={3}>
        {videos.map((video) =>
          <Grid key = {video.ipfsHash} item xs={2}>
           <Link to = {`/$/${video.ipfsHash}`}
                 style={{ textDecoration: 'none' }}>
            <Card>
              <CardMedia
                className = {classes.media}
                component = 'video'
                image = {`https://ipfs.infura.io/ipfs/${video.ipfsHash}`}
                title = {video.title} />
              <Typography>
                {video.title}
                <br/>
                Posted by {getUserName(video.poster)} 
                &nbsp;
                <ReactTimeAgo date={video.createdOn * 1000} 
                              locale="en-US" />
              </Typography>
             </Card>
            </Link>
          </Grid>
        )}
      </Grid>}
    </div>
  );
}
