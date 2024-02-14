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

const PieChartcity = () => {


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
                Scans by Cities
            </Typography>
            <br></br>
    <br></br>
            <ReactApexChart options={ {
              chart: {
                
               //width: 380,
               //height:500,
                type: 'donut',
              },
              plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 270
                }
              },
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                formatter: function (val: any, opts: any) {
                  return tooltips[opts.seriesIndex] + ' - ' + opts.w.globals.series[opts.seriesIndex];
                },
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            }}    series={counts} type="donut" width={380} />
        </Box>
    );
};

export default PieChartcity;
