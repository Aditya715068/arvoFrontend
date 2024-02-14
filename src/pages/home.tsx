import { useList } from "@refinedev/core";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Map from "./components/am4chartMap/am4chartMap";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect ,useState} from "react";
import axios, { AxiosResponse } from 'axios';

interface Column {
  id: "Id" | "Product" | "Location" | "Category" | "ProductID";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "Id", label: "Product", minWidth: 170 },
  { id: "Product", label: "Product Name", minWidth: 100 },
  {
    id: "Location",
    label: "Location",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "Category",
    label: "Category\u00a0(SubCategory\u00b2)",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "ProductID",
    label: "ProductID",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
    Product: string;
  Id: string;
  Location: string;
  Category: string;
  ProductID: number;
}

function createData(
    Id: string,
    Product: string,
  Location: string,
  Category: string,
  ProductID: number
): Data {
 
  return { Id, Product, Location, Category, ProductID };
}


interface NfcSession {
    _id: string;
    nfcData: string;
    geodata: {
      ip: string;
      hostname: string;
      city: string;
      region: string;
      country: string;
      loc: string;
      org: string;
      postal: string;
      timezone: string;
    };
    productData: any; // Adjust the type based on the actual structure
    timestamp: string;
    // Add more fields as needed
  }

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard
} from "components";
import ScanbyProduct from "../../src/components/charts/ScanbyProduct";
import PieChartcity from "../../src/components/charts/Piechartcity";
import OrderHistory from "../../src/components/charts/orderHistory"

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [nfcsessions, setNfcsessions] = useState<NfcSession[]>([]);



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response: AxiosResponse<{ nfcsessions: NfcSession[] }> = await axios.get(
            'https://arvoaic.onrender.com/api/v1/nfcscan/nfcSession'
          );
          setNfcsessions(response.data.nfcsessions);
          console.log("nfcsessions--    ",nfcsessions)
        //   localStorage.setItem('nfcsessions', JSON.stringify(response.data.nfcsessions))
       

        } catch (error) {
          console.error('Error fetching NfcSessions:', error);
        }
      };
  
      fetchData();
    }, []);

    const transformedData = nfcsessions.map((item) => {
        const [latitude, longitude] = item.geodata.loc.split(',').map(Number);

        
      
        return {
          latitude,
          longitude,
          size:4, 
          tooltip:item.geodata.city /* specify your tooltip logic here */,
          fill: "#F00" /* specify your fill logic here */,
        };
      });

      localStorage.setItem('latlong', JSON.stringify(transformedData))
       
      
      console.log(transformedData);

 
 
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  console.log("-->>",latestProperties)
const rows:any[]=[]
  
  latestProperties.map((i)=>{
    let val=createData(i.photo,i.title,i.location,i.propertyType,i._id);
    rows.push(val);
  })


  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="black">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Total Tags Purchased"
          value={684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]} 
        
        />
        <PieChart
          title="Total Order Place"
          value={2}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        {/* <PieChart
          title="Total Product Type"
          value={5684}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Product Categories"
          value={8}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        /> */}
        <PieChart
          title="Total Scans"
          value={nfcsessions.length}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Avg Scans per coutomer"
          value={3}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Map  data={transformedData} />

        <PieChartcity />
        {/* <PropertyReferrals /> */}
      </Stack>
      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <OrderHistory />
       
      </Stack>

      <Box
        flex={1}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
        display="flex"
        flexDirection="column"
        minWidth="100%"
        mt="25px"
        sx={{boxShadow: 'rgba(156, 204, 252, 0.2) 0px 0px 12px 8px'}}
        
      >
        <Typography fontSize="18px" fontWeight={600} color="#11142d">
          Product List
        </Typography>

        <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 ,boxShadow: 'rgba(156, 204, 252, 0.2) 0px 0px 12px 8px'}}>
          {/* {latestProperties.map((property) => (
                        <PropertyCard
                            key={property._id}
                            id={property._id}
                            title={property.title}
                            location={property.location}
                            price={property.price}
                            photo={property.photo}
                        />
                    ))} */}
          <Paper sx={{ width: "100%", overflow: "hidden" ,boxShadow: 'rgba(156, 204, 252, 0.2) 0px 0px 12px 8px'}}>
            <TableContainer sx={{ maxHeight: 440 ,}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id ==="Id"?<img src={value} height={60} width={60}/>:column.format && typeof value === "number"
                                  ?  column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
