import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ArrowRise from '../../assets/statistics.png'
import Cargo from '../../assets/cargo.png'
import DownRise from '../../assets/graph.png'


import { PieChartProps } from "interfaces/home";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
    console.log(title)
    return (
        <Box
            id="chart"
            flex={1}
            display="flex"
            bgcolor="#fcfcfc"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            pl={3.5}
            py={2}
            gap={2}
            borderRadius="15px"
            minHeight="110px"
            width="fit-content"
        >
            <Stack direction="column">
                <Typography fontSize={'1.2rem'} fontWeight={800} color="black" fontFamily={'sans-serif'}>
                    {title}
                </Typography>
                <Typography
                    fontSize={24}
                    color="orange"
                    fontWeight={1000}
                    mt={1}
                   
                  
                >
                    {value}
                </Typography>
            </Stack>
            {title=='Total Order Place'?<img src={Cargo} height={50} width={50} style={{marginRight:'50px'}}/>
        :title=='Total Tags Purchased'?<img src={DownRise} height={50} width={50} style={{marginRight:'50px'}}/>
        :title=='Total Scans'?<img src={ArrowRise} height={50} width={50} style={{marginRight:'50px'}}/>:
            <ReactApexChart
                options={{
                    chart: { type: "donut" },
                    colors,
                    legend: { show: false },
                    dataLabels: { enabled: false },
                }}
                series={series}
                type="donut"
                width="120px"
            />
        }

        </Box>
    );
};

export default PieChart;
