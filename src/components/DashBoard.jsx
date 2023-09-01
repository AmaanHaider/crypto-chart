import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Select,
  Center,
} from "@chakra-ui/react";
import {
  FiMenu,
  
} from "react-icons/fi";
import CoinComp from "./CoinComp";
import { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../configs/Api"
import CoinApache from "./CoinApache";


const MobileNav = ({ onOpen,setChartType, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Crypto-Chart
      </Text>
      <Box m={5}>
        <Flex mt={2}>
        <Text m={2}>Choose Chart Layout :</Text>
       <HStack spacing={{ base: "0", md: "6" }}>
        <Select
          onChange={(event) => setChartType(event.target.value)}
          defaultValue="option1" // Set a default option
        >
          <option value="option1">Chart.js Charts</option>
          <option value="option2">Apache SDK charts</option>
        </Select>
      </HStack>
        </Flex>
        <Text color="red" p={2}>
         * Note: This option is just for Demo*
        </Text>

        </Box>
    </Flex>
  );
};


const SidebarContent = ({  trendingCoinData, onClose, setCoinId, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Crypto-Chart
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box>
      <Text mx="8" fontSize="xl" fontFamily="monospace" fontWeight="bold">
          TRENDING COINS
        </Text>
      </Box>
      <Box mt="4" maxHeight="calc(100vh - 4rem)" overflowY="auto">
        {trendingCoinData.map((data) => (
          <Box
            as="a"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            key={data.id}
            onClick={() => setCoinId(data.id)}
          >
            <Flex
              align="center"
              p="4"
              borderRadius="lg"
              role="group"
              cursor="pointer"
              _hover={{
                bg: "cyan.400",
                color: "white",
              }}
              {...rest}
            >
              <Flex gap={4}  >
                <Box width="20%">
                  <Center>
                    <img
                      src={data.image}
                      _groupHover={{
                        color: "white",
                      }}
                    />
                  </Center>
                </Box>
                <Box width="75%" ml={1}>
                    <Text>{data.id.toUpperCase()}</Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currency, setCurrency] = useState("USD");
  const [trendingCoinData, setTrendingCoinData] = useState([]);
  const [coinId, setCoinId] = useState("");
  const [chartType, setChartType] = useState("option1"); // Default chart type

    useEffect(() => {
   const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(CoinList(currency));
      setTrendingCoinData(response.data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };
  fetchTrendingCoins()
},[]);

  return (
    <Box minH="100vh" >
      <SidebarContent
      trendingCoinData={trendingCoinData}
        onClose={onClose}
        setCoinId={setCoinId}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent 
          trendingCoinData={trendingCoinData}
          onClose={onClose} 
          setCoinId={setCoinId}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} setChartType={setChartType}/>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {chartType === "option1" ? (
          <CoinComp coinId={coinId} />
        ) : (
          <CoinApache coinId={coinId} />
          
        )}
      </Box>
    </Box>
  );
};

export default DashBoard;
