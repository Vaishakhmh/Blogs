import React from 'react'
import Button from '@material-ui/core/Button'
import classes from '../pages/start.module.css'
import {Link} from 'react-router-dom'
const start=()=>{
    return (
        <div className={classes.Background}>
            <p className={classes.Head}>Blog-Awesome</p>
            <div className={classes.divCent}>
            <Button variant="contained" color="secondary" size="large" style={{marginLeft:"15px"}} component={Link} to="/login">Login</Button>
            <Button variant="contained" color="secondary" size="large" style={{marginLeft:"15px"}} component={Link} to="/signup">Sign Up</Button>
            </div>
            <Button variant="contained" color="secondary" size="large" style={{marginLeft:"39%"}} component={Link} to="/home">Check out some cool Blogs</Button>
            <p className={classes.text}>Get to read some interesting blogs of interesing people</p>
        </div>

    )
}

export  default start;