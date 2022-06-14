import './h.css';
import React, {useState, useEffect} from 'react';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Icon from '@material-ui/core/Icon';
import { Button } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import {Grid} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";

function Dotmenu() {

  const [open, setOpen] = useState(true);
  let history = useHistory();
  let [token, setToken] = useState(false);
  const regToken = localStorage.getItem("regtoken");

  const count = () => {
    setOpen(false)
  }

  const count1 = () => {
    setOpen(true)
  }

  const logoutUser = () => {

     localStorage.removeItem('user');
     localStorage.removeItem('regtoken');
     history.push("/") 
  }

  return (
    <div className="p">
      
      { open == true ? 
      <>
      <div className="menu" onClick={count} ><IconButton edge="start"  color="inherit" aria-label="menu">
            <AccountCircleIcon style={{fontSize:"35px"}}/>
          </IconButton></div>
      </> : 
      <>
      <div className="menu" onClick={count1} ><IconButton edge="start"  color="inherit" aria-label="menu">
            <AccountCircleIcon style={{fontSize:"35px"}}/>
          </IconButton></div>
      <div className='collpse' >
        <Grid container 
        justify="center"
        spacing={3}
        > 
          <Grid item lg={12}><AccountCircleIcon style={{color:"black",fontSize:"100px"}}/></Grid>
          { localStorage.getItem("regtoken") == null ?
            <>
            <Grid item lg={5}><Link to="/signin" style={{textDecoration: "none"}}><Button>Sign In</Button></Link></Grid>
            <Grid item lg={5}><Link to="/signup" style={{textDecoration: "none"}}><Button>Sign Up</Button></Link></Grid>
            </>
            :
            <>
            <Grid item lg={12}><Button onClick={logoutUser}>Log out</Button></Grid>
            </>
        }
        </Grid>
      </div>
      </>
    }
      
    </div>
  );
}

export default Dotmenu;
