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
import { useParams } from "react-router-dom";
import CoinChartsJs from "../components/CoinChartJs";
import { SingleCoin } from "../configs/Api";
import { CryptoState } from "../context/CryptoContext";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinComp = () => {
  const id = "bitcoin";
  const [coin, setCoin] = useState();
  const { currency, symbol } = CryptoState();
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
  }, []);
  if (!coin) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner color="red" size="lg" />
      </Flex>
    );
  }
  // console.log("coinnnnnnnnn",coin);

  return (
    <Box>
      <CoinChartsJs coin={coin} />
      <Box mt="5" borderRight="2px solid grey">
        <Box>
          <Center>
            <Image
              src={coin?.image.large}
              alt={coin?.name}
              height={200}
              marginBottom={4}
            />
          </Center>
        </Box>

        <Heading
          as="h3"
          fontWeight="bold"
          marginBottom={4}
          fontFamily="Montserrat"
        >
          {coin?.name}
        </Heading>
        <Text
          fontFamily="Montserrat"
          padding={4}
          paddingTop={0}
          textAlign="justify"
        >
          {coin?.description.en.split(". ")[0]}.
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="start"
          padding={4}
          paddingTop={2}
          width="100%"
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
        </Flex>
      </Box>
    </Box>
  );
};

export default CoinComp;
