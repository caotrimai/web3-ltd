import { makeStyles } from '@mui/styles';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import './style.scss';

const useStyles = makeStyles({
  toastMessage: {
    fontSize: '14px',
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function ToastMessage () {
  const classes = useStyles();
  return <ToastContainer className={classes.toastMessage} />;
}