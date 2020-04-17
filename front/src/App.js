import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  CssBaseline, 
  useScrollTrigger, 
  Container, 
  Slide } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';

import Search from './Search'

//const useStyles = makeStyles((theme) => ({}));
  
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function HideAppBar(props) {
  //const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant="subtitle1">Repositórios por Linguagem</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container>
        <Search />
      </Container>
    </React.Fragment>
  );
}
