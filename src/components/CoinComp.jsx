import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import CoinChartsJs from "../components/CoinChartJs";
import { SingleCoin } from "../configs/Api";
import { CryptoState } from "../context/CryptoContext";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinComp = ({coinId}) => {
  const id = coinId || "bitcoin"
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, [id]);
  if (!coin) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner color="red" size="lg" />
      </Flex>
    );
  };
  return (
    <Box>
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
          <Box marginTop="1%" width="25%">
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
                 {" "}  M
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      <CoinChartsJs coin={coin} />
    </Box>
  );
};

export default CoinComp;
