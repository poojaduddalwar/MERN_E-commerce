import {
  Table,
  Thead,
  Tbody,
  TableCaption,
  Tr,
  Th,
  Td,
  Button,
  Stack,
  Input
} from '@chakra-ui/react';

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { deleteProduct, editProduct } from '../../actions/product';
import toast from 'react-hot-toast';

const ProductsTable = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/v1/product/all');
    const { products } = res.data;
    setProducts(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (productId) => {
    dispatch(deleteProduct(productId));
    setTimeout(getProducts, 1000); // Slight delay to allow state update
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      listPrice: product.listPrice,
      color: product.color,
      stock: product.stock,
      category: product.category._id,
      description: product.description,
      compatibleWith: product.compatibleWith,
      imageUrl: product.imageUrl,
    });
  };

  const handleUpdate = (id) => {
    setLoading(true);
    dispatch(editProduct(id, formData))
      .then(() => {
        toast.success("Product Updated successfully");
        setEditingProduct(null);
        setTimeout(getProducts, 1000);
      })
      .catch((err) => {
        toast.error("Failed to Update product");
      })
      .finally(() => setLoading(false));

  };

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
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map(product => (
          <Tr key={product._id}>
            <Td>{product._id}</Td>

            <Td>
              {editingProduct === product._id ? (
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                product.name
              )}
            </Td>

            <Td>{product.category.name}</Td>

            <Td>
              {editingProduct === product._id ? (
                <Input
                  type='number'
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              ) : (
                product.price
              )}
            </Td>

            <Td>
              {editingProduct === product._id ? (
                <Input
                  type='number'
                  value={formData.listPrice}
                  onChange={(e) => setFormData({ ...formData, listPrice: e.target.value })}
                />
              ) : (
                product.listPrice
              )}
            </Td>

            <Td>
              {editingProduct === product._id ? (
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              ) : (
                product.color
              )}
            </Td>

            <Td color={product.stock < 20 ? 'red' : 'green.400'} isNumeric>
              {editingProduct === product._id ? (
                <Input
                  type='number'
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                />
              ) : (
                product.stock
              )}
            </Td>

            <Td>
              <Stack direction='row' spacing={4} align='center'>
                {editingProduct === product._id ? (
                  <Button onClick={() => handleUpdate(product._id)} colorScheme='green'
                    isLoading={loading}
                    loadingText="Saving">
                    Save
                  </Button>
                ) : (
                  <Button onClick={() => handleEdit(product)} colorScheme='purple'>
                    Edit
                  </Button>
                )}

                <Button onClick={() => handleDelete(product._id)} colorScheme='red'>
                  Delete
                </Button>
              </Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default ProductsTable;
