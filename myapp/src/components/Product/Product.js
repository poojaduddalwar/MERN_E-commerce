import {
    Container,
    SimpleGrid,
    Image,
    Flex,
    Heading,
    Text,
    Stack,
    StackDivider,
    Icon,
    useColorModeValue,
    Button,
} from '@chakra-ui/react';
import {
    IoAnalyticsSharp,
    IoColorFilterOutline,
    IoLogoBitcoin,
    IoScanOutline,
    IoSearchSharp,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { ReactElement } from 'react';
import Values from '../Values';
import Details from './Details';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';


const Feature = ({ text, icon, iconBg }) => {
    return (
        <Stack direction={'row'} align={'center'}>
            <Flex
                w={8}
                h={8}
                align={'center'}
                justify={'center'}
                rounded={'full'}
                bg={iconBg}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{text}</Text>
        </Stack>
    );
};

export default function Product() {

    // const [selectedProduct, setSelectedproduct] = useState(null)
    // const { products } = useSelector(state => state.products)
    const [products, setproducts] = useState({})
    const { productId } = useParams()
    //useParams return the parameter in the url

    // const fetchProduct = (productId) => {
    //     const fproduct = products.find(item => item.id == productId)
    //     console.log(fproduct)
    //     setSelectedproduct(fproduct)
    // }

    // useEffect(() => {
    //     fetchProduct(productId)
    // }, [])

    // console.log(selectedProduct)

    const getProducts = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/product/all')
        // console.log(res.data)
        const { products } = res.data
        // console.log(products)
        // setproducts(products)
        const fproduct = products.find(item => item._id == productId)
        // console.log(fproduct)
        setproducts(fproduct)
    }

    useEffect(() => {
        getProducts()
    }, [])

    // const { imageUrl, listingPrice, category, description, productName, compatibleWith, color } = selectedProduct

    return (
        <Container maxW={'7xl'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={products && products.imageUrl}
                        objectFit={'cover'}
                    />
                </Flex>
                <Stack spacing={4}>
                    <Text
                        textTransform={'uppercase'}
                        color={'blue.400'}
                        fontWeight={600}
                        fontSize={'sm'}
                        bg={useColorModeValue('blue.50', 'blue.900')}
                        p={2}
                        alignSelf={'flex-start'}
                        rounded={'md'}>
                        {products && products.category}
                    </Text>
                    <Heading>{products && products.productName}</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        {products && products.description}
                    </Text>
                    <Stack
                        spacing={4}
                        divider={
                            <StackDivider
                                borderColor={useColorModeValue('gray.100', 'gray.700')}
                            />
                        }>
                        <Feature
                            icon={

                                <Icon as={IoScanOutline} color={'yellow.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('yellow.100', 'yellow.900')}
                            text={`For : ${products && products.compatibleWith}`}
                        />

                        <Feature
                            icon={
                                <Icon as={IoColorFilterOutline} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={`Color : ${products && products.color}`}
                        />
                        <Feature
                            icon={<Icon as={IoShieldCheckmarkOutline} color={'green.500'} w={5} h={5} />}
                            iconBg={useColorModeValue('green.100', 'green.900')}
                            text={'12 Months Warranty'}
                        />
                    </Stack>
                    <Flex justifyContent={'space-between'} spacing={10} pt={2}>
                        <Button
                            flexGrow={'4'}
                            loadingText="Submitting"
                            size="lg"
                            bg={'gray.900'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.400',
                            }}>
                            Buy Now
                        </Button>
                        <Heading color={'gray.900'} textAlign={'center'} borderRadius={'10px'} flexGrow={'2'} background={'gray.100'}>Rs. {products && products.listPrice}</Heading>
                    </Flex>
                </Stack>

            </SimpleGrid>
            <Values />
            <Details />
        </Container>
    );
}
