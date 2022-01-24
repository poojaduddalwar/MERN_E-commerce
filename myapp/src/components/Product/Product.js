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

    const [selectedProduct, setSelectedproduct] = useState(null)
    const { products } = useSelector(state => state.products)
    const { productId } = useParams()
    //useParams return the parameter in the url

    const fetchProduct = (productId) => {
        const fproduct = products.find(item => item.id == productId)
        console.log(fproduct)
        setSelectedproduct(fproduct)
    }

    useEffect(() => {
        fetchProduct(productId)
    }, [])

    console.log(selectedProduct)

    // const { imageUrl, listingPrice, category, description, productName, compatibleWith, color } = selectedProduct

    return (
        <Container maxW={'7xl'} py={12}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <Flex>
                    <Image
                        rounded={'md'}
                        alt={'feature image'}
                        src={selectedProduct && selectedProduct.imageUrl}
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
                        {selectedProduct && selectedProduct.category}
                    </Text>
                    <Heading>{selectedProduct && selectedProduct.productName}</Heading>
                    <Text color={'gray.500'} fontSize={'lg'}>
                        {selectedProduct && selectedProduct.description}
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
                            text={`For : ${selectedProduct && selectedProduct.compatibleWith}`}
                        />

                        <Feature
                            icon={
                                <Icon as={IoColorFilterOutline} color={'purple.500'} w={5} h={5} />
                            }
                            iconBg={useColorModeValue('purple.100', 'purple.900')}
                            text={`Color : ${selectedProduct && selectedProduct.color}`}
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
                        <Heading color={'gray.900'} textAlign={'center'} borderRadius={'10px'} flexGrow={'2'} background={'gray.100'}>{selectedProduct && selectedProduct.listingPrice}</Heading>
                    </Flex>
                </Stack>

            </SimpleGrid>
            <Values />
            {/* <Details /> */}
        </Container>
    );
}

/* 
! IMPORTANT NOTE :- 
 we used {selectedProduct && selectedProduct.listingPrice} like
 this everywhere because if the selectedProduct has a value then 
 only we will continue with the other part i.e selectedProduct.
 listingPrice otherwise its going to just display null .
 instead of this we can also use ternary operator {selectedProduct ? selectedProduct.listingPrice : null} but we'll need to introduce a fallback case as well and for && we don't need that
 
*/