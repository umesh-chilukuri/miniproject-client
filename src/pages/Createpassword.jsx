import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, IconButton, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

const Createpassword = () => {
  const classes = useStyles();
  const [idNumber, setIdNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    
    event.preventDefault();
    if (idNumber.trim() === '' || newPassword.trim() === '' || confirmPassword.trim() === '') {
      alert('Please fill out all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Password created for ID:', { idNumber, newPassword });
    alert('Password created successfully!');
  };

  return (
    <Container component="main" maxWidth="false" className={classes.root}>
      <Box className={`${classes.form} create-password-form`}>
        <Typography component="h1" variant="h4" align="center" className={classes.textWhite}>
          Create Password
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="idNumber"
            label="ID Number"
            name="idNumber"
            autoComplete="idNumber"
            autoFocus
            className={classes.input}
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            autoComplete="new-password"
            className={classes.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Rewrite Password"
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="confirm-password"
            className={classes.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <Button type="submit" fullWidth variant="contained" className={classes.submit}>
            Create Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Createpassword;
