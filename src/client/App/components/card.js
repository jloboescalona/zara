import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const StyledCardMedia = styled(CardMedia)(() => ({
  '&': {
    borderRadius: '50%',
    margin: "-70px auto 0",
    height: '140px',
    width: '140px'
  }
}))

const StyledCard = styled(Card)(() => ({
  '&': {
    marginTop: '90px',
    overflow: "inherit",
    textAlign: "center",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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

const PodCastCard = ({
  data = {}
}) => {
  const {
    ['im:artist']: artist = {},
    ['im:image']: image = [],
    ['im:name']: name = {},
    id = {}
  } = data
  const podcastId = id?.attributes?.['im:id']

  return (
    <Link to={`/podcast/${podcastId}`}>
      <StyledCard sx={{ maxWidth: 345 }}>
        {image?.[2]?.label && <StyledCardMedia
          image={image?.[2]?.label}
          title={name?.label || ''}
        />}
        <CardContent>
          <StyleTypography gutterBottom variant="h5" component="div">
            {name?.label || ''}
          </StyleTypography>
          <StyleTypography variant="body2" color="text.secondary">
            Author: {artist.label || ''}
          </StyleTypography>
        </CardContent>
      </StyledCard>
    </Link>
  )
}

export default PodCastCard