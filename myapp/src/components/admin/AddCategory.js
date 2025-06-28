import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/category';
import toast from 'react-hot-toast'

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    setLoading(true);

    dispatch(addCategory(name, description))
      .then(() => {
        // toast.success("Category Added successfully!")

        // Reset fields
        setName('');
        setDescription('');

        // Wait a bit to show success and refresh the page
        setTimeout(() => {
          window.location.reload(); // 🔁 Soft page refresh
        }, 1000);
      })
      .catch((err) => {
        toast.error("Failed to add category")
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="md">
      <Heading mb={6} size="lg">Add Category</Heading>

      <FormControl isRequired mb={4}>
        <FormLabel>Category Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
      </FormControl>

      <FormControl isRequired mb={6}>
        <FormLabel>Category Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
      </FormControl>

      <Button
        colorScheme="blue"
        onClick={handleAddCategory}
        isLoading={loading}
        loadingText="Submitting"
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddCategory;
