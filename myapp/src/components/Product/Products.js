import {
    Box,
    Heading,
    Flex,
    Link
} from '@chakra-ui/react';
import ProductCard from './ProductCard'
import Filters from '../FilterDrawer'
import { Link as lee } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Products() {
    const [products, setproducts] = useState([])
    const getProducts = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL+'/api/v1/product/all')
  
        const { products } = res.data
      
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