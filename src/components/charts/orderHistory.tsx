import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { PieChartProps } from "interfaces/home";
import { min } from "@amcharts/amcharts4/.internal/core/utils/Math";

interface TooltipsAndCounts {
    tooltips: string[];
    counts: number[];
  }

  interface DataItem {
    latitude: number;
    longitude: number;
    size: number;
    tooltip: string;
    fill: string;
  }

const OrderHistory = () => {


    // const  data= localStorage.getItem('latlong')
    // console.log(data,"from piechart")
    const city = [ "c1","c2" ];
    const getUniqueTooltipsAndCounts = <T extends { tooltip: string }>(data: T[]): TooltipsAndCounts => {
        const tooltips: string[] = [];
        const counts: number[] = [];
      
        data.forEach((item) => {
          const tooltipIndex = tooltips.indexOf(item.tooltip);
      
          if (tooltipIndex === -1) {
            tooltips.push(item.tooltip);
            counts.push(1);
          } else {
            counts[tooltipIndex]++;
          }
        });
      
        return { tooltips, counts: counts.map(Number) };
      };
      
      // Example usage
      const storedData = localStorage.getItem('latlong')
      const parsedData: DataItem[] = storedData ? JSON.parse(storedData) : [];
      
      const { tooltips, counts } = getUniqueTooltipsAndCounts(parsedData);
      
      console.log('Unique Tooltips:', tooltips);
      console.log('Occurrences:', counts);
      

    
    return (
        <Box
        p={4}
        bgcolor="#fcfcfc"
        id="chart"
        minWidth={540}
        display="flex"
        flexDirection="column"
        borderRadius="15px"
           // minHeight="110px"
          
        >
               <Typography fontSize={18} fontWeight={900} color="black" fontFamily={'sans-serif'}>
                Orders By Months
            </Typography>
            <br></br>
    <br></br>
    <ReactApexChart options={{
              chart: {
                type: 'bar',
                height: 350
              },
              annotations: {
                xaxis: [{
                  x: 500,
                  borderColor: '#00E396',
                  label: {
                    borderColor: '#00E396',
                    style: {
                      color: '#fff',
                      background: '#00E396',
                    },
                    text: 'X annotation',
                  }
                }],
                yaxis: [{
                  y: 'July',
                  y2: 'September',
                  label: {
                    text: 'Y annotation'
                  }
                }]
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                }
              },
              dataLabels: {
                enabled: true
              },
              xaxis: {
                categories: [ 'August', 'September', 'October', 'November', 'December', "January", "February"],
              },
              grid: {
                xaxis: {
                  lines: {
                    show: true
                  }
                }
              },
              yaxis: {
                reversed: true,
                axisTicks: {
                  show: true
                }
              }
    }} series={  [{
        data: [0, 0, 0, 0, 0, 56, 67]
      }]} type="bar" height={350} />
        </Box>
    );
};

export default OrderHistory;
