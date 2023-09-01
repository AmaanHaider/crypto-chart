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




const SidebarContent = ({  trendingCoinData, onClose, setCoinId, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      // bg={useColorModeValue("#5C5470", "#5C5470")}
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
    
         {
          trendingCoinData.map((data)=>(
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
              <Flex>

              <Box width="20%">
                <Center>
                  <img src={data.image}
                     _groupHover={{
                    color: "white",
                  }}/>
                </Center>
              </Box>
              <Box width="75%" ml={1}>
                <Center>
                {data.id.toUpperCase()}
                </Center>
                
              </Box>
              </Flex>
            </Flex>
          </Box>
          ))
        } 
      </Box>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      // bg={useColorModeValue("#ADC4CE", "#ADC4CE")}
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
      <HStack spacing={{ base: "0", md: "6" }}>
      <Select placeholder='Select option'>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
      </Select>
      </HStack>
    </Flex>
  );
};

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currency, setCurrency] = useState("USD");
  const [trendingCoinData, setTrendingCoinData] = useState([]);
  const [coinId, setCoinId] = useState(""); // Lifted the state up
    useEffect(() => {
   const fetchTrendingCoins = async () => {
    try {
      console.log("sdsjdhsdjhsdhsjdhsjhdshdsjdhsjdhsjdhjsd");
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
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <CoinComp coinId={coinId} />
      </Box>
    </Box>
  );
};

export default DashBoard;
