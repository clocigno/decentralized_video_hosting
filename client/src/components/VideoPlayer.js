import { useEffect, useState, useCallback } from 'react'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { drizzleReactHooks } from '@drizzle/react-plugin'
import drizzle from '../redux/drizzle';
import { Link, useParams } from "react-router-dom";
import TipForm from './TipForm'
import TextField from '@material-ui/core/TextField';
import ReactTimeAgo from 'react-time-ago';
import useVideoPlayerStyles from '../styles/VideoPlayer'

function VideoPlayer() {
    const classes = useVideoPlayerStyles();

    const drizzleState = drizzleReactHooks.useDrizzleState(drizzleState => ({
        contracts: drizzleState.contracts,
        account: drizzleState.accounts[0]
      }))

    
    const { ipfsHash } = useParams();

    const { useCacheCall } = drizzleReactHooks.useDrizzle();

    const video = useCacheCall('VideoFactory', 'videos', ipfsHash)

    const [isSubscribed, setIsSubscribed] = useState(undefined)
    const [videoComments, setVideoComments] = useState(undefined)
    const [userInput, setUserInput] = useState('');

    const handleChange = (event) => {
        setUserInput(event.target.value);
    };

    useEffect(() => {
        if (video) {
            const instance = drizzle.contracts['UserFactory']
            const cacheKey = instance.methods['isSubscribed'].cacheCall(drizzleState.account, video.poster)
            const cache = drizzleState.contracts['UserFactory']['isSubscribed'][cacheKey]
            setIsSubscribed(cache && cache.value)
        }
    }, [video, drizzleState.account, drizzleState.contracts])

    useEffect(() => {
        if (video) {
            const instance = drizzle.contracts['CommentFactory']
            const cacheKey = instance.methods['getLatestComments'].cacheCall(video.ipfsHash)
            const cache = drizzleState.contracts['CommentFactory']['getLatestComments'][cacheKey]
            setVideoComments(cache && cache.value)
        }
    }, [video, drizzleState.contracts])

    const getUserName = (poster) => {
        const instance = drizzle.contracts['UserFactory']
        const cacheKey = instance.methods['users'].cacheCall(poster)
        const cache = drizzleState.contracts['UserFactory']['users'][cacheKey]
        return cache && cache.value.name
    }

    const getDate = (timestamp) => {
        var myDate = new Date(timestamp * 1000);
        return(myDate.toLocaleString());        
    }

    const handleSubscribe = useCallback(
        () => {
          if (video && !isSubscribed) {
            const contractMethod = drizzle.contracts['UserFactory'].methods['subscribe']
            contractMethod.cacheSend(video.poster)
          } else if (video) {
            const contractMethod = drizzle.contracts['UserFactory'].methods['unsubscribe']
            contractMethod.cacheSend(video.poster)
          }
        },
        [video, isSubscribed],
    );

    const handleComment= useCallback(
        () => {
          if (video) {
            const contractMethod = drizzle.contracts['CommentFactory'].methods['createComment']
            contractMethod.cacheSend(video.ipfsHash, userInput)
            setUserInput('')
          }
        },
        [video, userInput],
      );

    return (
        <div className={classes.root}>
            <Box>
                <video controls
                    src={`https://ipfs.infura.io/ipfs/${ipfsHash}`}
                    className={classes.video}>

                    Sorry, your browser doesn't support embedded videos,
                    but don't worry, you can <a href={`https://ipfs.infura.io/ipfs/${ipfsHash}`}>download it</a>
                    and watch it with your favorite video player!

                </video>
                <Card className={classes.card}>
                    {video && 
                        <CardContent>
                            <Typography className={classes.title}>
                                {video.title}
                            </Typography>
                            <Typography className={classes.text}>
                                {getDate(video.createdOn)}
                            </Typography>
                            <Box className={classes.box}>
                                <Link to={`/@${video.poster}`}
                                      style={{ textDecoration: 'none' }}> 
                                <Typography className={classes.text}>
                                    Posted by {getUserName(video.poster)}
                                </Typography>
                                </Link>
                                <CardActions>
                                    <Button size="small" onClick = {handleSubscribe} color="primary">
                                        {isSubscribed ? 'UNSUBSCRIBE' : 'SUBSCRIBE'}
                                    </Button>
                                    <TipForm poster={video.poster} />
                                </CardActions>
                            </Box>
                        </CardContent>}
                </Card>
                <Card className={classes.card}>
                    {video && 
                        <CardContent>
                            <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                <TextField
                                    className={classes.textField}
                                    id="filled-multiline-flexible"
                                    label="Say something about this..."
                                    multiline
                                    maxRows={4}
                                    value={userInput}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                </div>
                                <Button 
                                    onClick={handleComment} 
                                    color="primary">
                                    COMMENT
                                </Button>
                            </form>
                            {videoComments &&  videoComments.map((comment) =>   
                                <Card className={classes.commentCard}
                                      key={comment.id}>
                                    <b>
                                        {getUserName(comment.poster)}
                                        &nbsp; 
                                        <ReactTimeAgo date={comment.createdOn * 1000} 
                                                      locale="en-US"/>
                                    </b>
                                    <br />
                                    {comment.post}
                                </Card>
                            )}
                        </CardContent>}
                </Card>
            </Box>
        </div>
    )
}

export default VideoPlayer
