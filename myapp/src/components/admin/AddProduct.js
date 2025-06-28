import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Select,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../actions/product';
import toast from 'react-hot-toast'

const AddProduct = () => {
  const [name, setname] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [description, setdescription] = useState('');
  const [compatibleWith, setcompatibleWith] = useState('');
  const [category, setcategory] = useState('');
  const [color, setcolor] = useState('');
  const [listingPrice, setlistingPrice] = useState('');
  const [actualPrice, setactualPrice] = useState('');
  const [stock, setstock] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/category/all`);
      setCategories(res.data.category);
    } catch (err) {
      toast.error("Failed to get the categories")
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddProduct = () => {
    setLoading(true);

    dispatch(
      addProduct(
        name,
        actualPrice,
        listingPrice,
        description,
        color,
        compatibleWith,
        category,
        imageUrl,
        stock
      )
    )
      .then(() => {
        toast.success("Product added successfully!")

        // Reset form
        setname('');
        setimageUrl('');
        setdescription('');
        setcompatibleWith('');
        setcategory('');
        setcolor('');
        setlistingPrice('');
        setactualPrice('');
        setstock(0);

        // Soft page refresh
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        toast.error("Failed to add product.")
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box m={4}>
      <Heading mb={6}>Add Product</Heading>
      <FormControl>
        <FormLabel>Product Name</FormLabel>
        <Input value={name} onChange={(e) => setname(e.target.value)} type='text' />

        <FormLabel>Image URL</FormLabel>
        <Input value={imageUrl} onChange={(e) => setimageUrl(e.target.value)} type='text' />

        <FormLabel>Product Description</FormLabel>
        <Input value={description} onChange={(e) => setdescription(e.target.value)} type='text' />

        <FormLabel>Compatible With</FormLabel>
        <Input value={compatibleWith} onChange={(e) => setcompatibleWith(e.target.value)} type='text' />

        <FormLabel>Category</FormLabel>
        <Select
          value={category}
          onChange={(e) => {
            const selected = categories.find(c => c.name === e.target.value);
            if (selected) setcategory(selected._id);
          }}
          placeholder="Select product's category"
        >
          {categories.map(category => (
            <option key={category._id}>{category.name}</option>
          ))}
        </Select>

        <FormLabel>Product Color</FormLabel>
        <Input value={color} onChange={(e) => setcolor(e.target.value)} type='text' />

        <FormLabel>Actual Price</FormLabel>
        <Input value={actualPrice} onChange={(e) => setactualPrice(e.target.value)} type='number' />

        <FormLabel>Listing Price</FormLabel>
        <Input value={listingPrice} onChange={(e) => setlistingPrice(e.target.value)} type='number' />

        <FormLabel>Stock</FormLabel>
        <Input value={stock} onChange={(e) => setstock(e.target.value)} type='number' />

        <Button
          onClick={handleAddProduct}
          marginTop={4}
          color={'white'}
          bg={'blue.400'}
          isLoading={loading}
          loadingText="Submitting"
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddProduct;
