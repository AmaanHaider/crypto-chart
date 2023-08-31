import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Img,
  Select,
  Center,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  
} from "react-icons/fi";
import CoinComp from "./CoinComp";
import { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../configs/Api";


// const coinDataItems = [
//   { name: "Ethereum", imgSrc: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" },
// ];


const CoinNavItem = ({ imgSrc, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
      gap="10%"
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
        
        <Box width="20%">
          <Center>
            <img src={imgSrc}
               _groupHover={{
              color: "white",
            }}/>
          </Center>

        </Box>
        <Box width="75%">
          <Text>

          {children}
          </Text>

        </Box>
      </Flex>
    </Box>
  );
};


const SidebarContent = ({ onClose, ...rest }) => {
  const [currency, setCurrency] = useState("USD");
const [trendingCoinData, setTrendingCoinData] = useState([]);

useEffect(() => {
  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(CoinList(currency));
      setTrendingCoinData(response.data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };
    fetchTrendingCoins();
}, [currency]);


  // console.log("sdsdsdsdsddsd",trendingCoinData);

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
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
          <CoinNavItem key={data.id.toUpperCase()} imgSrc={data.image}>
            {data.id.toUpperCase()}
          </CoinNavItem>
        ))}
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
      bg={useColorModeValue("white", "gray.900")}
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
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex> */}
      </HStack>
    </Flex>
  );
};

const DashBoard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  
  
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <CoinComp />
      </Box>
    </Box>
  );
};

export default DashBoard;
