import React from 'react';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import compose from 'recompose/compose';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import {deleteBlog} from '../store/Actions/blogAction'
const styles = theme => ({
  card: {
    marginTop:"40px",
    maxWidth: '80%',
    alignCenter:'center'
    },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

 function SingleBlog(props) {
   let deleteicon='';
   if(props.auth.user==props.owner._id)
   {
     deleteicon=<DeleteIcon ></DeleteIcon>
   }
   const {classes}=props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.owner.name[0]}
          </Avatar>
        }
        title={props.title}
        subheader={props.owner.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      <IconButton onClick={()=>props.deleter(props.id)}>
        {deleteicon}
      </IconButton>
      </CardActions>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.content}
          </Typography>
        </CardContent>
        <CardContent>
        <Typography variant="caption" color="secondary">created:{moment(props.createdat).fromNow()}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
const mapDispatchToProps=(dispatch)=>({
  deleter:(id)=>dispatch(deleteBlog(id))
})

const mapStateToProps=(state)=>({
 auth:state.authReducer
})


export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SingleBlog);