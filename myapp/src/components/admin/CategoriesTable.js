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
import { deleteCategory } from '../../actions/category';



const CategoriesTable = () => {
    const dispatch = useDispatch()

    const handleDelete = (categoryId) => {
        dispatch(deleteCategory(categoryId))
    }
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        const res = await axios.get('http://localhost:8080/api/v1/category/all')
        // console.log(res.data)
        const { category } = res.data
        // // console.log(products)
        setCategories(category)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Table variant='simple'>
            <TableCaption>All Categories</TableCaption>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Category Name</Th>
                </Tr>
            </Thead>
            <Tbody>
                {categories.map(category => <>
                    <Tr>
                        <Td>{category && category._id}</Td>
                        <Td>{category && category.name}</Td>
                        <Td>
                            <Stack direction='row' spacing={4} align='center'>
                                <Button onClick={() => { handleDelete(category._id) }} colorScheme='red' variant='solid'>
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

export default CategoriesTable;
