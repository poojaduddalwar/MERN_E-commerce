import {
    Box,
    Heading,
    Flex,
    Link
} from '@chakra-ui/react';
import ProductCard from './ProductCard'
import Filters from '../FilterDrawer'
import Values from '../Values';
import { Link as lee } from 'react-router-dom'
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Products() {
    // const { products } = useSelector(state => state.products)
    const [products, setproducts] = useState([])
    const getProducts = async () => {
        const res = await axios.get(' https://pooja-ecommerce-api.herokuapp.com/api/v1/product/all')
        // console.log(res.data)
        const { products } = res.data
        // console.log(products)
        setproducts(products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Box w="100%" color="gary.600" >
            <Box p={6} textAlign={'center'} border={'none'} >
                <Flex justifyContent={'center'} flexDirection={'row'}>
                    <Heading >Showing All Products...</Heading>
                    <Filters />
                </Flex>
            </Box>
            <Flex justifyContent={'center'} flexWrap={'wrap'} >
                {products.map(product => <Link to={`/shop/${product._id}`} as={lee} ><ProductCard data={product} /></Link>)}
            </Flex>
        </Box>
    );
}