
import React, { useState, useEffect } from 'react';
import { TextField, Button, Link, Typography, Container, Box, IconButton, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { gsap } from 'gsap';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import { server } from '../constants/config';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#121212',
    minHeight: '100vh',
    width: '100%',
    justifyContent: 'center',
    color: '#fff',
    margin: 0,
    padding: 0,
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#333',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  },
  submit: {
    margin: '20px 0 10px',
    background: 'linear-gradient(45deg, #00C9FF 30%, #92FE9D 90%)',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#00B4DB',
    },
  },
  link: {
    color: '#00C9FF',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  textWhite: {
    color: '#fff',
  },
  input: {
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'FFFF00',
      },
      '&:hover fieldset': {
        borderColor: '#00C9FF',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00C9FF',
      },
    },
    '& .MuiInputLabel-outlined': {
      color: '#fff',
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [profilePic, setProfilePic] = useState(null); // New state for profile picture
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    gsap.fromTo(
      '.login-form',
      { opacity: 0, y: -50, duration: 1 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (userid.trim() === '' || password.trim() === '') {
      alert('Please fill out all fields');
      return;
    }

    const toastId = toast.loading('Logging In...');
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        { userid, password },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something Went Wrong', { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== retypePassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('userid', userid);
    formData.append('password', password);
    formData.append('username', username);
    if (profilePic) {
      formData.append('avatar', profilePic);
    }

    const toastId = toast.loading('Signing Up...');
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(data);
      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Somethingggg Went Wrong', { id: toastId });
      console.log(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="false" className={classes.root}>
      <Box className={`${classes.form} login-form`}>
        <Typography component="h1" variant="h4" align="center" className={classes.textWhite}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>

        <form noValidate onSubmit={isLogin ? handleLogin : handleSignUp}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userid"
            label="User ID"
            name="userid"
            autoComplete="userid"
            autoFocus
            className={classes.input}
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
          />
          {!isLogin && (
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                className={classes.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                variant="contained"
                component="label"
                fullWidth
                style={{ marginTop: '10px', marginBottom: '10px' }}
              >
                Upload Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleProfilePicChange}
                />
              </Button>
              {profilePic && (
                <Typography variant="body2" className={classes.textWhite}>
                  Selected: {profilePic.name}
                </Typography>
              )}
            </>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            className={classes.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {!isLogin && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="retypePassword"
              label="Retype Password"
              type="password"
              id="retypePassword"
              className={classes.input}
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
          )}
          <Button type="submit" fullWidth variant="contained" className={classes.submit} disabled={isLoading}>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
          <Typography
            variant="body2"
            align="center"
            style={{ margin: '20px 0' }}
            className={classes.textWhite}
          >
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <Link href="#" onClick={() => setIsLogin(!isLogin)} className={classes.link}>
              {isLogin ? 'Sign Up Instead' : 'Login Instead'}
            </Link>
          </Typography>
        </form>
      </Box>
      <Box style={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="body2" className={classes.textWhite}>
          This website is built for educational purposes only.
        </Typography>
        <Typography variant="body2" className={classes.textWhite}>
          User ID refers to your roll number or employee number provided by your institution.
        </Typography>
        <Typography variant="body2" className={classes.textWhite}>
          This project is still in the development stage. If you face any issues, please refresh the page.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
