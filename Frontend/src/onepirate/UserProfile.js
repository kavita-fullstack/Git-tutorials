import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory } from "react-router-dom";
import { DropzoneArea, DropzoneDialog } from "material-ui-dropzone";
import Container from "@material-ui/core/Container";
import Typography from "./modules/components/Typography";
import AppFooter from "./modules/views/AppFooter";
import AppAppBar from "./modules/views/AppAppBar";
import AppForm from "./modules/views/AppForm";
import Button from "./modules/components/Button";
import { authRequests } from "../utils/apirequests";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const useStyles = makeStyles((theme) => ({
  container: { marginLeft: 60 },
  grid: { marginTop: 25 },
  frame1: {
    marginLeft: 90,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -44,
    },
  },
  frame: {
    display: "flex",
    marginTop: 10,
  },

  dropzone: {
    display: "flex",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 35,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -80,
    },
  },
  dropzoneContent: {
    boxShadow: "0px 0px 10px #4dabe3",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    margin: 3,
    padding: 42,
  },
  dropzoneFile: {},
  uploadbutton: {
    marginLeft: 35,
  },
  link: { textDecoration: "none" },
  updateButton: {
    marginLeft: 50,
    borderRadius: "10px"
  },
  success: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    color: theme.palette.success.dark,
    fontWeight: "Bold",
  },
  button: {
    padding: theme.spacing(5),
  },
}));

function UserProfile() {

  const history = useHistory();
  const classes = useStyles();
  const [files, setFiles] = useState();
  const [resumeFile, setResumeFile] = useState()
  const [message, setMessage] = useState(false);
  const [resumeMessage, setResumeMessage] = useState(false);
  const [nopic, setNopic] = useState(false);
  const [noresume, setNoresume] = useState(false);
  const [data, setData] = useState([
    {
      username: null,
      email: null,
      experience: null,
      location: { city: null },
      status: null,
      technologies: [],
    },
  ]);

  useEffect(() => {

    console.log("User profile")

    axios
      .create({
        headers: {
          Authorization:
            `Bearer ${JSON.parse(localStorage.getItem('regtoken'))}`,
        },
      })
      .get("https://jobapp.freedynamicdns.org/users")
      .then((res) => {
        console.log(res.data);
        const loginUser = JSON.parse(localStorage.getItem("user"));
        console.log("loginUser",loginUser);

        const xyz = res.data.map((val) => {
          return val.id == loginUser.id ? setData([val]) : null;
        });
        // console.log(xyz);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  const clicklogout = () => {
    localStorage.setItem("regtoken", "");
    localStorage.setItem("user", "");
    // alert(JSON.stringify(values));
  };

  const OnUploadPic = () => {

    console.log("files",files);

    if (files[0]) {

      const formData = new FormData();

      formData.append('files', files[0]);

      axios.post("https://jobapp.freedynamicdns.org/upload/", formData)
      .then(res => {
        

        //const imgId = res.data[0].id;

        axios.put(`https://jobapp.freedynamicdns.org/users/${data[0].id}`, { photo: res.data[0].id }).then((response) => {

          console.log(response.data)

        }).catch((err) => {
          console.log(err)
        })
        setMessage(true);
      }).catch(err => {
        console.log(err);
      })

    } else {
      setNopic(true);
    }
  };

  const OnUploadResume = () => {

    if (resumeFile[0]) {
      let resumeData = new FormData();
      resumeData.append("files.Resume", resumeFile[0]);

      console.log(data[0].id)
      console.log(resumeData);

      axios.post("https://jobapp.3utilities.com/resumes", resumeData).then((res) => {

        console.log(res.data._id);

        const resId = res.data._id;

        axios.put(`/users/${data[0].id}`, { resumeId: resId }).then((response) => {
          console.log(response.data)
        }).catch((err) => {
          console.log(err)
        })
        setResumeMessage(true);
      });
    } else {
      setNoresume(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMessage(false);
    setResumeMessage(false);
    setNopic(false);
    setNoresume(false);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <Container className={classes.container}>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          User Profile
        </Typography>
        <Grid container spacing={2} className={classes.grid}>
          {data.map((val) => {
            return (
              <>
                <Grid item xs={1} sm={1}></Grid>
                <Grid item xs={10} sm={5}>
                  <dl className={classes.frame1}>
                    <Typography variant="h6" gutterBottom>
                      Username
                    </Typography>

                    <Typography variant="h5" gutterBottom>
                      <dd>- {val.username}</dd>{" "}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      <dd>- {val.email}</dd>{" "}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Experience
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      <dd>- {!val.experience ? "N/A" : val.experience + " years"} </dd>{" "}
                    </Typography>
                  </dl>
                </Grid>
                <Grid item xs={10} sm={5}>
                  <dl className={classes.frame}>
                    <div>
                      <Typography variant="h6" gutterBottom>
                        Location
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        <dd>- {!val.location ? "N/A" : val.location.city}</dd>{" "}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Technologies
                      </Typography>
                      <Typography variant="h5" gutterBottom>
                        <dd>- {val.technologies.length == 0 ? "N/A" : val.technologies.map((j) => j.technology).join(", ")}</dd>{" "}
                      </Typography>
                    </div>
                    <Link
                      to={{
                        pathname: "/updateprofile",
                        state: { sendData: data },
                      }}
                      className={classes.link}
                    >
                      <Button
                        color="secondary"
                        variant="contained"
                        className={classes.updateButton}
                      >
                        Update Profile
                      </Button>
                    </Link>
                  </dl>
                </Grid>
                <Grid item xs={1} sm={1}></Grid>
              </>
            );
          })}
        </Grid>
        <Grid container spacing={2} >
        <Grid item xs={1} sm={1}></Grid>
          <Grid item xs={10} sm={10} md={5} >
            <div className={classes.dropzone}>
              <div className={classes.dropzoneContent}>
                <div className={classes.dropzoneFile}>
                  <DropzoneArea
                    filesLimit={1}
                    showAlerts={false}
                    onChange={(files) => {
                      setFiles(files);
                    }}
                  />
                </div>
                <div className={classes.uploadbutton}>
                  <Button style={{borderRadius: "10px"}} color="secondary" variant="contained" onClick={OnUploadPic}>
                    Upload Profile Pic
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={10} sm={10} md={5}>
            <div className={classes.dropzone} >
              <div className={classes.dropzoneContent}>
                <div className={classes.dropzoneFile}>
                  <DropzoneArea
                    filesLimit={1}
                    showAlerts={false}
                    onChange={(files) => {
                      setResumeFile(files);
                    }}
                  />
                </div>
                <div className={classes.uploadbutton}>
                  <Button style={{borderRadius: "10px"}} color="secondary" variant="contained" onClick={OnUploadResume}>
                    Upload Resume
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={1} sm={1}></Grid>
        </Grid>
        <Snackbar open={message} 
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
          autoHideDuration={5000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Profile Pic Uploaded Successfully !
          </Alert>
        </Snackbar>
        <Snackbar open={resumeMessage} 
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={5000} 
        onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Resume Submitted Successfully !
          </Alert>
        </Snackbar>
        <Snackbar open={nopic} 
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
          autoHideDuration={5000}
          onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please select Profile Pic first.
          </Alert>
        </Snackbar>
        <Snackbar open={noresume} 
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={5000} 
        onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please select Resume first.
          </Alert>
        </Snackbar>
        {/*<div align="center" className={classes.button}>
          <Button
            color="secondary"
            variant="contained"
            onClick={clicklogout}
            component={Link}
            to="/signin"
          >
            Log Out
          </Button>
        </div>*/}
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(UserProfile);