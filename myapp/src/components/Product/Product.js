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
    IoColorFilterOutline,
    IoScanOutline,
    IoShieldCheckmarkOutline,
    IoCartOutline
} from 'react-icons/io5';
import Values from '../Values';
import Details from './Details';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { addToCart } from '../../actions/cart';
import { useDispatch } from 'react-redux';


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

    const [products, setproducts] = useState([])
    const [category, setcategory] = useState([])
    const [compatibleWith, setcompatibleWith] = useState([])
    const { productId } = useParams()
    const dispatch = useDispatch()
    //useParams return the parameter in the url

    const getProducts = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/v1/product/all')
       
        const { products } = res.data
        
        const fproduct = products.find(product => product._id == productId)
       
        const { category, compatibleWith } = fproduct
        setcategory(category)
        setcompatibleWith(compatibleWith)
        setproducts(fproduct)
    }

    useEffect(() => {
        getProducts()
    }, [])

    console.log(products)
    

    const addCart = (item) => {
        dispatch(addToCart(item))
    }

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
                        {products && category.description}
                    </Text>
                    <Heading>{products && products.name}</Heading>
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
                            text={`For : ${products && compatibleWith}`}
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
                            onClick={() => {
                                addCart(products)
                            }}
                            flexGrow={'4'}
                            loadingText="Submitting"
                            size="lg"
                            bg={'gray.900'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.400',
                            }}>
                            Add To Cart &nbsp; &nbsp; <IoCartOutline size={30} />
                        </Button>
                        <Heading color={'gray.900'} textAlign={'center'} borderRadius={'10px'} flexGrow={'2'} background={'gray.100'}>$ {products && products.listPrice}</Heading>
                    </Flex>
                </Stack>

            </SimpleGrid>
            <Values />
            <Details />
        </Container>
    );
}
