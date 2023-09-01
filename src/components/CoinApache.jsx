import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChakraProvider, Box, Heading, Center } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { HistoricalChart } from '../configs/Api';
import { CryptoState } from '../context/CryptoContext';

function CoinApache({ coinId }) {
  const id = coinId || "bitcoin"
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(365);
  const { currency } = CryptoState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(HistoricalChart(id, days, currency));
          setChartData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [coinId]);

  const option = {
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          return date.toLocaleDateString();
        },
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: chartData ? chartData.prices : [],
        type: 'line',
        areaStyle: {},
      },
    ],
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        {coinId.toUpperCase()} Price Chart (Last {days} Days)
      </Heading>
      {chartData ? (
        <ReactECharts option={option} style={{ height: '400px' }} />
      ) : (
        <Center>Loading...</Center>
      )}
    </Box>
  );
}

export default CoinApache;
