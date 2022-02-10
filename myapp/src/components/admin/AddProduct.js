import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
    Box,
    Heading,
    Select,
    Button
} from '@chakra-ui/react'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../actions/product'



const AddProduct = () => {
    const [name, setname] = useState('')
    const [imageUrl, setimageUrl] = useState('')
    const [description, setdescription] = useState('')
    const [category, setcategory] = useState('')
    const [color, setcolor] = useState('')
    const [listingPrice, setlistingPrice] = useState('')
    const [actualPrice, setactualPrice] = useState('')
    const [stock, setstock] = useState(0)

    const dispatch = useDispatch()

    const handleAddProduct = () => {
        // console.log({ name, imageUrl, description, category, color, actualPrice, listingPrice, stock })
        dispatch(addProduct({ name, imageUrl, description, category, color, actualPrice, listingPrice, stock }))
    }


    return (
        <Box m={4}>
            <Heading>Add Product</Heading>
            <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input onChange={(e) => { setname(e.target.value) }} type='text' />
                <FormLabel>Image URL</FormLabel>
                <Input onChange={(e) => { setimageUrl(e.target.value) }} type='text' />
                <FormLabel>Product Description</FormLabel>
                <Input onChange={(e) => { setdescription(e.target.value) }} type='text' />
                <FormLabel>Category</FormLabel>
                <Select onChange={(e) => { setcategory(e.target.value) }} placeholder="Select product's category">
                    <option>Watch Band</option>
                    <option>Iphone cases</option>
                </Select>
                <FormLabel>Product Color</FormLabel>
                <Input onChange={(e) => { setcolor(e.target.value) }} type='text' />
                <FormLabel>Actual Price</FormLabel>
                <Input onChange={(e) => { setactualPrice(e.target.value) }} type='number' />
                <FormLabel>Listing Price</FormLabel>
                <Input onChange={(e) => { setlistingPrice(e.target.value) }} type='number' />
                <FormLabel>Stock</FormLabel>
                <Input onChange={(e) => { setstock(e.target.value) }} type='number' />
                <Button onClick={handleAddProduct} marginTop={4} color={'white'} bg={'blue.400'}>Submit</Button>
            </FormControl>
        </Box>
    );
}

export default AddProduct;