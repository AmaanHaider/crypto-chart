import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Heading,
  Center,
  Flex,
  CircularProgress,
  Text,
  Select,
  Image,
} from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";
import { HistoricalChart, SingleCoin } from "../configs/Api";
import { CryptoState } from "../context/CryptoContext";
import { chartDays } from "../configs/Data";

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

function CoinApache({ coinId }) {
  const id = coinId || "bitcoin";
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(365);
  const { currency, symbol } = CryptoState();
  const [flag, setFlag] = useState(false);
  const [coin, setCoin] = useState();

  useEffect(() => {
    const fetchCoin = async () => {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    };
    fetchCoin();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(HistoricalChart(id, days, currency));
        setFlag(true);
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [days, id]);
  const option = {
    xAxis: {
      type: "time",
      boundaryGap: false,
      axisLabel: {
        formatter: (value) => {
          const date = new Date(value);
          return date.toLocaleDateString();
        },
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: chartData ? chartData.prices : [],
        type: "line",
        areaStyle: {},
      },
    ],
  };
  return (
    <Box p={4}>
      <Box mt="5" borderRight="2px solid grey">
        <Flex gap="5%">
          <Box w="70%">
            <Flex>
              <Center gap={4}>
                <Image
                  src={coin?.image.large}
                  alt={coin?.name}
                  height={20}
                  marginBottom={4}
                />
                <Heading
                  as="h3"
                  fontWeight="bold"
                  marginBottom={4}
                  fontFamily="Montserrat"
                >
                  {coin?.name}
                </Heading>
              </Center>
            </Flex>
            <Text
              fontFamily="Montserrat"
              padding={4}
              paddingTop={0}
              textAlign="justify"
            >
              {coin?.description.en.split(". ")[0]}.
            </Text>
          </Box>
          {/* <Box marginTop="1%" width="25%">
            <Box
              direction={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="start"
              padding={4}
              paddingTop={2}
            >
              <Flex align="center">
                <Text as="h5" fontWeight="bold">
                  Rank:
                </Text>
                <Text fontFamily="Montserrat" marginLeft={2}>
                  {coin?.market_cap_rank}
                </Text>
              </Flex>
              <Flex align="center">
                <Text as="h5" fontWeight="bold">
                  Current Price:
                </Text>
                <Text fontFamily="Montserrat" marginLeft={2}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                  )}
                </Text>
              </Flex>

              <Flex align="center">
                <Text as="h5" fontWeight="bold">
                  Market Cap:
                </Text>
                <Text fontFamily="Montserrat" marginLeft={2}>
                  {symbol}{" "}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </Text>
              </Flex>
            </Box>
          </Box> */}
        </Flex>
      </Box>
      <Box>
        {!chartData || !flag ? (
          <Flex justify="center" align="center">
            <CircularProgress
              isIndeterminate
              color="green.300"
              size="150px"
              thickness={1}
            />
          </Flex>
        ) : (
          <Box width="30%">
            <Flex width="100%">
              <Center>
                <Text fontSize="sm" as="b">
                  Time Frame :
                </Text>
              </Center>
              <Select
                value={days}
                onChange={(event) => {
                  setDays(event.target.value);
                  setFlag(false);
                }}
                width="40%"
                padding="2"
                marginTop="0.5%"
                gap="5"
              >
                {chartDays.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </Select>
            </Flex>
          </Box>
        )}
      </Box>
      {chartData ? (
        <ReactECharts option={option} style={{ height: "400px" }} />
      ) : (
        <Center>Loading...</Center>
      )}
    </Box>
  );
}

export default CoinApache;
