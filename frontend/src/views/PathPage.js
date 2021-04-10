import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/shared/SearchBar.js';

const useStyles = makeStyles((theme) => ({
  title: theme.typography.h1,
}));

export default function PathPage() {
  const classes = useStyles();
  return (
    <div>
      <Typography className={classes.title}>Princeton Courses</Typography>
      <SearchBar />
    </div>
  );
}
