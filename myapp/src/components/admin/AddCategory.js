// import {
//     FormControl,
//     Input,
//     FormHelperText,
//     FormLabel,
//     Box,
//     Select,
//     Heading,
//     Button
// } from '@chakra-ui/react'
// import { useState } from 'react';
// import { useDispatch } from 'react-redux'
// import { addCategory } from '../../actions/category';


// const AddCategory = () => {

//     const [name, setname] = useState('')
//     const [description, setdescription] = useState('')


//     const dispatch = useDispatch()

//     const handleAddCategory = () => {
//         dispatch(addCategory(name, description))
//     }

//     return (
//         <Box m={4}>
//             <Heading>Add Category</Heading>
//             <FormControl>
//                 <FormLabel>Category name</FormLabel>
//                 <Input onChange={(e) => { setname(e.target.value) }} type="text" />
//                 <FormLabel>Category description</FormLabel>
//                 <Input onChange={(e) => { setdescription(e.target.value) }} type="text" />
//                 <Button onClick={handleAddCategory} marginTop={4} color={'white'} bg={'blue.400'}>Submit</Button>
//             </FormControl>
//         </Box>
//     );
// }

// export default AddCategory;
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Button
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../actions/category';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddCategory = () => {
    dispatch(addCategory(name, description));
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
      <Button colorScheme="blue" onClick={handleAddCategory}>
        Submit
      </Button>
    </Box>
  );
};

export default AddCategory;
