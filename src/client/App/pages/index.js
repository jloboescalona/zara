import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { ThemeProvider, styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Episode from 'client/App/pages/episode';
import Header from 'client/App/components/header';
import Home from 'client/App/pages/home';
import PageNotFound from 'client/App/pages/notFound';
import Podcast from 'client/App/pages/podcast';
import React from 'react'
import theme from 'client/App/theme';

const StyledContainer = styled(Container)(({theme}) => ({
  '& *': {
    fontFamily: theme.typography.fontFamily
  },
  '& a': {
    textDecoration: 'none'
  },
  '& audio': {
    width: '100%'
  }
}))

const Pages = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <StyledContainer maxWidth="lg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcast/:podcastId" element={<Podcast />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode/>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </StyledContainer>
    </BrowserRouter>
  </ThemeProvider>
)

export default Pages
