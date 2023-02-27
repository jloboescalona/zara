import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCardMedia = styled(CardMedia)(() => ({
  '&': {
    borderRadius: '5px',
    margin: "0 auto",
    height: '250px',
    width: '250px'
  }
}))

const StyledCard = styled(Card)(() => ({
  '&': {
    overflow: "inherit",
    textAlign: "justify",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 10px;',
  },
  '& hr': {
    margin: '20px 0'
  }
}))

const StyleTypography = styled(Typography)(()=>({
  '&': {
    display: '-webkit-box',
    'WebkitBoxOrient': 'vertical',
    'WebkitLineClamp': '1',
    overflow: 'hidden',
  }
}))

const StyleTypographyTitle = styled(Typography)(()=>({
  '&': {
    marginBottom: "10px",
    fontWeight: 'bold'
  }
}))

const StyleTypographyDescription = styled(Typography)(()=>({
  '&': {
    fontStyle: 'italic'
  }
}))

const Sidebar = ({
  data = {}
}) => {
  const navigate = useNavigate();
  const {
    artworkUrl600: image = "",
    trackName: title = "",
    artistName = {},
    description = "",
  } = data

  return (
    <StyledCard sx={{ maxWidth: 345 }} onClick={()=> navigate(-1)}>
      {image && <StyledCardMedia
        image={image}
      />}
      <CardContent>
        <hr/>
        <StyleTypography gutterBottom variant="h6" component="div">
          {title || ''}
        </StyleTypography>
        <StyleTypography>
          by: {artistName || ''}
        </StyleTypography>
        <hr/>
        <StyleTypographyTitle variant="body2">
          Description:
        </StyleTypographyTitle>
        <StyleTypographyDescription variant="body2">
          {description.replace(/<\/?[^>]+(>|$)/g, "") || ''}
        </StyleTypographyDescription>
      </CardContent>
    </StyledCard>
  )
}

Sidebar.propTypes = {
  data: PropTypes.shape({
    artworkUrl600: PropTypes.string,
    trackName: PropTypes.string,
    artistName: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    description: PropTypes.string
  })
}

export default Sidebar