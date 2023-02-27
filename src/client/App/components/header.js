import { Link, useLocation } from "react-router-dom";
import { alpha, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import React from 'react'

const HeaderGrid = styled(Grid)(({item, container, theme}) => {
  if(item){
    return {
      marginTop: '20px',
      padding: '10px',
      
      '& a': {
        color: '#5577B2',
        textDecoration: 'none',
      }
    }
  }
  if(container){
    return {
      boxShadow: `0px 5px 2px 0px ${alpha(theme.palette.success.main, 0.16)}`,
    }
  }
})

const Header = () => {
  const location = useLocation();
  const [route, setRoute] = useState();

  useEffect(() => {
    if(location?.pathname !== route) {
      setRoute(location?.pathname)
    }
  }, [location, route]);

  return (
    <HeaderGrid container>
      <HeaderGrid item xs={8}>
        <Link to="/">
          PodCaster
        </Link>
      </HeaderGrid>
      <HeaderGrid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
      {
        location?.pathname !== route && <CircularProgress size={20}/>
      }
      </HeaderGrid>
    </HeaderGrid>
  );
}

export default Header