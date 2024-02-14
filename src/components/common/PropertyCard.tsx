import Place from "@mui/icons-material/Place";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

import { PropertyCardProps } from "interfaces/property";

const PropertyCard = ({
  id,
  title,
  location,
  price,
  photo,
}: PropertyCardProps) => {
  return (
    // <Card
    //     component={Link}
    //     to={`/properties/show/${id}`}
    //     sx={{
    //         maxWidth: "330px",
    //         padding: "10px",
    //         "&:hover": {
    //             boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
    //         },
    //         cursor: "pointer",
    //     }}
    //     elevation={0}
    // >

    //     <CardMedia
    //         component="img"
    //         width="100%"
    //         height={210}
    //         image={photo}
    //         alt="card image"
    //         sx={{ borderRadius: "10px" }}
    //     />
    //     <CardContent
    //         sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             justifyContent: "space-between",
    //             gap: "10px",
    //             paddingX: "5px",
    //         }}
    //     >
    //         <Stack direction="column" gap={1}>
    //             <Typography fontSize={16} fontWeight={500} color="#11142d">
    //                 {title}
    //             </Typography>
    //             <Stack direction="row" gap={0.5} alignItems="flex-start">
    //                 <Place
    //                     sx={{
    //                         fontSize: 18,
    //                         color: "#11142d",
    //                         marginTop: 0.5,
    //                     }}
    //                 />
    //                 <Typography fontSize={14} color="#808191">
    //                     {location}
    //                 </Typography>
    //             </Stack>
    //         </Stack>
    //         <Box
    //             px={1.5}
    //             py={0.5}
    //             borderRadius={1}
    //             bgcolor="#dadefa"
    //             height="fit-content"
    //         >
    //             <Typography fontSize={12} fontWeight={600} color="#475be8">
    //                 ${price}
    //             </Typography>
    //         </Box>
    //     </CardContent>
    // </Card>
    //     <Card sx={{ maxWidth: 345 }}
    //     variant="outlined">
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         height="140"
    //         image="/static/images/cards/contemplative-reptile.jpg"
    //         alt="green iguana"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           Lizard
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Lizards are a widespread group of squamate reptiles, with over 6,000
    //           species, ranging across all continents except Antarctica
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>

    <Card variant="outlined"
           component={Link}
        to={`/properties/show/${id}`}
        sx={{
            maxWidth: "330px",
            padding: "10px",
            "&:hover": {
                boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
            },
            cursor: "pointer",
            boxShadow: 'rgba(156, 204, 252, 0.2) 0px 0px 12px 8px'
        }}
        elevation={0}>
      {" "}
      <CardContent>
        <CardMedia
          component="img"
          width="100%"
          height={250}
          image={photo}
          alt="card image"
          sx={{ borderRadius: "30px" }}
        
        />
        <Stack direction="column" gap={1}>  
          <Typography fontSize={18} fontWeight={800} color="#11142d" margin={2}>
            {title}
          </Typography>
        
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
