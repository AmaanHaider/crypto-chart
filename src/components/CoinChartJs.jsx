import {
    Box,
    Button,
    CircularProgress,
    Flex,
    Heading,
    Spinner,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { Line } from "react-chartjs-2";
  import { HistoricalChart } from "../configs/Api";
  import { CryptoState } from "../context/CryptoContext";
  import { chartDays } from "../configs/Data";
  

  import {
    Chart,
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
  } from "chart.js";
  
  Chart.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    CategoryScale,
  );
  
  
  const CoinChartJs = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const [flag, setFlag] = useState(false);
  
    const fetchHistoricData = async () => {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setFlag(true);
      setHistoricData(data.prices);
    };
  
    useEffect(() => {
      fetchHistoricData();
    }, [days]);
  
    const borderColor = useColorModeValue("green", "#e88054");
  
    return (
      <Box
      m="6"
   
      >
        {!historicData || !flag ? (
          <Flex justify="center" align="center">
            <CircularProgress color="red" size="250px" thickness={1} />
          </Flex>
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
  
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: borderColor,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <Flex
              marginTop={4}
              justifyContent="space-around"
              width="100%"
              marginBottom={{ base: 4, md: 0 }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    setFlag(false);
                  }}
                  variant={day.value === days ? "solid" : "outline"}
                >
                  {day.label}
                </Button>
              ))}
            </Flex>
          </>
        )}
      </Box>
    );
  };
  
  export default CoinChartJs;
  