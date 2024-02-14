import ReactApexChart from "react-apexcharts";
import { useEffect,useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowCircleUpRounded from "@mui/icons-material/ArrowCircleUpRounded";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";
interface DataItem {
  
        productData: {
          productName: string;
          // ... other fields in productData
        };
        _id: string;
        tagId: string;
        tagType: string;
        tagCounter: number;
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
          _id: string;
          // ... other fields in geodata
        };
        timestamp: string;
        __v: number;
        // ... other fields in your data item
      }

const TotalRevenue = () => {
    const storedData = localStorage.getItem('nfcsessions')
    console.log("-----<",storedData?.length);

    const [data, setData] = useState<DataItem[]>([]);
    const [last7MonthsArray, setLast7MonthsArray] = useState<number[]>([]);

    useEffect(() => {
        const storedData = localStorage.getItem('nfcsessions');
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        }
      }, []);
  
 
  
    // When the data changes, recalculate the last 7 months array
    useEffect(() => {
        const months = data.map(item => new Date(item.timestamp).getMonth());
        const currentMonth = new Date().getMonth();
        
        var last7Months = Array.from({ length: 7 }, (_, index) => {
          const targetMonth = (currentMonth - index + 12) % 12;
          return months.filter(month => month === targetMonth).length+0;
        });
    
        setLast7MonthsArray(last7Months);
      }, [data]);

  console.log(last7MonthsArray.slice().reverse(),last7MonthsArray)

  const TotalRevenueSeries = [
    {
        name: "Authentic Scans",
        data: last7MonthsArray.slice().reverse(),
    },
    {
        name: "BlackListed Scans",
        data: [95, 84, 72, 44, 108, 108, 47],
    },
];

    return (
        <Box
            p={4}
            flex={1}
            bgcolor="#fcfcfc"
            id="chart"
            display="flex"
            flexDirection="column"
            borderRadius="15px"
        >
            <Typography fontSize={18} fontWeight={900} color="black" fontFamily={'sans-serif'}>
                NFC Scans by months
            </Typography>

            <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                <Typography fontSize={28} fontWeight={700} color="#11142d">
                    {storedData?.length}
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <ArrowCircleUpRounded
                        sx={{ fontSize: 25, color: "#475be8" }}
                    />
                    <Stack>
                        <Typography fontSize={15} color="#475be8">
                            67%
                        </Typography>
                        <Typography fontSize={12} color="#808191">
                            Than Last Month
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <ReactApexChart
                series={TotalRevenueSeries}
                type="bar"
                height={310}
                options={TotalRevenueOptions}
            />
        </Box>
    );
};

export default TotalRevenue;
