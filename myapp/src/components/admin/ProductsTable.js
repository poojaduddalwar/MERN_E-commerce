import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    ButtonGroup,
    Stack
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { deleteProduct } from '../../actions/product';



const ProductsTable = () => {
    // const { products } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId))
    }
    const [products, setproducts] = useState([])

    const getProducts = async () => {
        const res = await axios.get(' https://pooja-ecommerce-api.herokuapp.com/api/v1/product/all')
        // console.log(res.data)
        const { products, message } = res.data
        // console.log(products)
        setproducts(products)
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Table variant='simple'>
            <TableCaption>All Products</TableCaption>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Actual Price</Th>
                    <Th>Listing Price</Th>
                    <Th>Color</Th>
                    <Th isNumeric>Stock</Th>
                </Tr>
            </Thead>
            <Tbody>
                {products.map(product => <>
                    <Tr>
                        <Td>{product && product._id}</Td>
                        <Td>{product && product.name}</Td>
                        <Td>{product && product.category.name}</Td>
                        <Td>{product && product.price}</Td>
                        <Td>{product && product.listPrice}</Td>
                        <Td>{product && product.color}</Td>
                        <Td color={product && product.stock < 20 ? "red" : "green.400"} isNumeric>{product && product.stock}</Td>
                        <Td>
                            <Stack direction='row' spacing={4} align='center'>
                                <Button onClick={() => { handleDelete(product._id) }} colorScheme='red' variant='solid'>
                                    Delete
                                </Button>
                                <Button colorScheme='purple' variant='solid'>
                                    Edit
                                </Button>
                            </Stack>
                        </Td>
                    </Tr>
                </>)}
            </Tbody>
        </Table>
    );
}

export default ProductsTable;



/*
! UNDERSTANDING THE FLOW TO DELETE A PRODUCT FROM LIST :
here in the ProductsTable.js onClick of the Delete button the handledelete function is called which takes product.id and we are dispatching an action which is returned by the deleteProduct function to the productsReducer where the productId is destructured from payload and the DELETE_PRODUCT case is executed and we get the resulted state which does not contain the deleted product with the use of filter method
*/