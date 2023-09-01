import {
    Box,
    Button,
    Center,
    CircularProgress,
    Flex,
    Heading,
    Select,
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
    const [days, setDays] = useState(365);
    const { currency } = CryptoState();
    const [flag, setFlag] = useState(false);

  
    useEffect(() => {
      const fetchHistoricData = async () => {
        try {
          const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
          setFlag(true);
          setHistoricData(data.prices);
        } catch (error) {
          console.error('Error fetching historic data:', error);
        }
      };
      
      fetchHistoricData();
    }, [days,coin]);
    const borderColor = useColorModeValue("green", "#e88054");
    return (
      <Box
      m="2%"
      gap="5"
      >
        {!historicData || !flag ? (
          <Flex justify="center" align="center">
            <CircularProgress isIndeterminate color="green.300" size="150px" thickness={1} />
          </Flex>
        ) : 
        (
          <>
           <Flex
               padding="2"
              marginTop="0.5%"
              width="100%"
            >
              <Box width="30%" >
                <Flex width="100%" >
                    <Center >
                  <Text fontSize="sm" as="b">Time Frame :</Text>
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
            </Flex>
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
           
          </>
        )}
      </Box>
    );
  };
  
  export default CoinChartJs;
  