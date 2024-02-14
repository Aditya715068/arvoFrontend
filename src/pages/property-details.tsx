import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useDelete, useGetIdentity, useShow } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import ChatBubble from "@mui/icons-material/ChatBubble";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Phone from "@mui/icons-material/Phone";
import Place from "@mui/icons-material/Place";
import axios from 'axios';
import Star from "@mui/icons-material/Star";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import { AiOutlineHeart } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import ReactImageGallery from "react-image-gallery";
import { ImagesProvider, ProductImages } from "react-product-image";
import Rater from "react-rater";
import ProductPage from "./components/ProductPage";
import "react-rater/lib/react-rater.css";
import * as React from 'react';

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ProductData {
    productName: string;
    // other fields in productData
  }
  
  interface ApiResponse {
    _id: string;
    tagId: string;
    tagType: string;
    tagCounter:  string;
    productData: ProductData;
    timestamp: string;
    geodata:Object
    // other fields in the response
  }


  function createData(
  
    tagId: string,
    tagType: string,
    tagCounter: string,
    geodata:object,
    timestamp:string,
  ) {
    return {
        tagId,
        tagType,
        tagCounter,
      timestamp,
      geodata:[geodata]
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

   console.log("------------------------",row.geodata)
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.tagId}
          </TableCell>
          <TableCell align="right">{row.tagType}</TableCell>
          <TableCell align="right">{row.tagCounter}</TableCell>
          <TableCell align="right">{row.timestamp}</TableCell>
          {/* <TableCell align="right">{row.protein}</TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Geo Data
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer IP address</TableCell>
                      
                      <TableCell align="right">city</TableCell>
                      <TableCell align="right">Country</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.geodata.map((deodata:any) => (
                        
                      <TableRow key={deodata.timezone}>
                        <TableCell component="th" scope="row">
                          {deodata.ip}
                        </TableCell>
                        <TableCell>{deodata.city}</TableCell>
                        <TableCell align="right">{deodata.country}</TableCell>
                        <TableCell align="right">
                        deodata
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  



import { CustomButton } from "components";

interface ProductPage {
    propertyDetails: object;
  }

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const PropertyDetails = ( ) => {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const { queryResult } = useShow();
    const { mutate } = useDelete();
    const { id } = useParams();

    const rows:any[]=[]
 


    const { data, isLoading, isError } = queryResult;

    const propertyDetails = data?.data ?? {};
    const [apiResponse, setApiResponse] = React.useState<ApiResponse[]>([]);

    React.useEffect(()=>{
    
        const postData = {
            productName:propertyDetails.title
            
          };
          
        axios.post('https://arvoaic.onrender.com/api/v1/nfcscan/nfcList', postData)
            .then(response => {
              // Handle the successful response
              console.log("API Response:", response.data);
           
                setApiResponse(response.data.list);
            
             
            //   setApiResponse(response.data);
           
        

              console.log("aditya----->",apiResponse);
            })
            .catch(error => {
              // Handle the error
              console.error(error);
            });
          

    },[])

     
    apiResponse.map((i)=>{
    let val= createData(i.tagId,i.tagType,i.tagCounter,i.geodata,i.timestamp);
    rows.push(val);
  })

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Something went wrong!</div>;
    }
    const productDetailItem = {
        images: [
          {
            original:
              "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
            thumbnail:
              "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
          },
          {
            original:
              "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
            thumbnail:
              "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
          },
          {
            original:
              "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
            thumbnail:
              "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
          },
          {
            original:
              "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            thumbnail:
              "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          },
          {
            original:
              "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
            thumbnail:
              "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
          },
        ],
        title: "BIG ITALIAN SOFA",
        reviews: "150",
        availability: true,
        brand: "apex",
        category: "Sofa",
        sku: "BE45VGTRK",
        price: 450,
        previousPrice: 599,
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
        size: ["XS", "S", "M", "L", "XL"],
        color: ["gray", "violet", "red"],
      };
      const plusMinuceButton =
        "flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

    const isCurrentUser = user.email === propertyDetails.creator.email;

    const handleDeleteProperty = () => {
        const response = confirm(
            "Are you sure you want to delete this property?",
        );
        if (response) {
            mutate(
                {
                    resource: "properties",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/properties");
                    },
                },
            );
        }
    };

    return (
        <Box
            borderRadius="15px"
            padding="20px"
            bgcolor="#FCFCFC"
            width="100%"
        >
            <Typography fontSize={25} fontWeight={700} color="#11142D">
                Details
            </Typography>

            <Box
                mt="20px"
                display="flex"
                flexDirection="row"
               // flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
            >
                {/* <Box flex={1} maxWidth={764}>
                    <img
                        src={propertyDetails.photo}
                        alt="property_details-img"
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="property_details-img"
                    />

                    <Box mt="15px">
                        <Stack
                             flex={1}
                             maxWidth={326}
                             display="flex"
                             flexDirection="column"
                             gap="20px"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {propertyDetails.propertyType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {propertyDetails.title}
                                </Typography>
                                <Stack
                                    mt={0.5}
                                    direction="row"
                                    alignItems="center"
                                    gap={0.5}
                                >
                                    <Place sx={{ color: "#808191" }} />
                                    <Typography fontSize={14} color="#808191">
                                        {propertyDetails.location}
                                    </Typography>
                                </Stack>
                            </Box>

                            <Box>
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    Price
                                </Typography>
                                <Stack
                                    direction="row"
                                    alignItems="flex-end"
                                    gap={1}
                                >
                                    <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#475BE8"
                                    >
                                        ₹{propertyDetails.price}
                                    </Typography>
                                    <Typography
                                        fontSize={14}
                                        color="#808191"
                                        mb={0.5}
                                    >
                                        for one day
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {propertyDetails.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box> */}
                 <ProductPage  propertyDetails={propertyDetails}/>
                <Box
                    width="100%"
                    flex={1}
                    maxWidth={600}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                 
                        {/* <Stack
                            mt={2}
                            // justifyContent="center"
                            // alignItems="center"
                            // textAlign="center"
                        >  
                            <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{propertyDetails.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                    ante justo. Integer euismod libero id mauris malesuada tincidunt.
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <div className="font-bold text-gray-700 dark:text-gray-300" style={{display:'flex' , justifyContent:'space-between'}}>Price: <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#DFBC00"
                                        marginLeft= '24px'
                                        marginTop= '-6px'
                                    >
                                        ₹{propertyDetails.price}
                                    </Typography></div>
                     
                    </div>
                    <div>
                    
               
                        <span className="font-bold text-gray-700 dark:text-gray-300 "style={{display:'flex' , justifyContent:'space-between'}} >    &nbsp;&nbsp;Availability:
                        <Typography
                                        fontSize={25}
                                        fontWeight={700}
                                        color="#00000"
                                        marginLeft= '24px'
                                        marginTop= '-6px'
                                    >
                                        {propertyDetails.price}
                                    </Typography></span>
                      
                    </div>
                </div>

                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {propertyDetails.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
                          
                            </Stack> */}
                              {/* <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                   Product Journey
                                </Typography>  <Timeline position="alternate">
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                          >
                            9:30 am
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                              <FastfoodIcon />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                              Eat
                            </Typography>
                            <Typography>Because you need strength</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            variant="body2"
                            color="text.secondary"
                          >
                            10:00 am
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">
                              <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                              Code
                            </Typography>
                            <Typography>Because it&apos;s awesome!</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary" variant="outlined">
                              <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                          </TimelineSeparator>
                          <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                              Sleep
                            </Typography>
                            <Typography>Because you need rest</Typography>
                          </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                          <TimelineSeparator>
                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            <TimelineDot color="secondary">
                              <RepeatIcon />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                              Repeat
                            </Typography>
                            <Typography>Because this is the life you love!</Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline> */}
                            </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        // border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        {/* <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(propertyDetails.creator.avatar)
                                        ? propertyDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {propertyDetails.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Agent
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <Place sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    North Carolina, USA
                                </Typography>
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {propertyDetails.creator.allProperties.length}{" "}
                                Properties
                            </Typography>
                        </Stack> */}

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            <CustomButton
                                title={"Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    <Edit />
                                }
                                handleClick={() => {
                                    
                                        navigate(
                                            `/properties/edit/${propertyDetails._id}`,
                                        );
                                    
                                }}
                            />
                            <CustomButton
                                title={"Delete"}
                                backgroundColor={
                                   "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={ <Delete />}
                                handleClick={() => {
                                    handleDeleteProperty();
                                }}
                            />
                        </Stack>
                    </Stack>

                    {/* <Stack>
                        <img
                            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                            width="100%"
                            height={306}
                            style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                    </Stack> */}

                    {/* <Box>
                        <CustomButton
                            title="Tag Request"
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth
                        />
                        
                    </Box> */}



   
                    
                </Box>
                
            </Box>
            <br></br>
            <br></br>
            <br></br>
           
           
            <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>NFC Uid</TableCell>
            <TableCell align="right">Tag Type</TableCell>
            <TableCell align="right">Tag Counter</TableCell>
            <TableCell align="right">Tag Status</TableCell>
            <TableCell align="right">Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        
        </Box>
    );
};

export default PropertyDetails;
