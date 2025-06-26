import {
  Box,
  Heading,
  Text,
  Stack,
  Divider,
  Badge,
  Flex,
  Image,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue('white', 'gray.800'); 

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${id}`, {
        withCredentials: true,
      });
      setOrder(res.data.order);
    } catch (err) {
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="300px">
        <Text fontSize="lg" color="gray.500">Loading...</Text>
      </Flex>
    );
  }

  if (!order) {
    return (
      <Box p={6}>
        <Text>Order not found.</Text>
      </Box>
    );
  }

  const { _id, createdAt, status, user, shippingInfo, orderItems, totalAmount } = order;

  return (
    <Box maxW="6xl" mx="auto" py={10} px={4} bg={bg} borderRadius="md" boxShadow="md">
      <Flex justify="space-between" mb={6}>
        <Heading size="lg">Order Details</Heading>
        <Button onClick={() => navigate('/admin/orders')} colorScheme="gray" size="sm">
          Back to Orders
        </Button>
      </Flex>

      <Stack spacing={4}>
        <Text><strong>Order ID:</strong> {_id}</Text>
        <Text><strong>Status:</strong> <Badge colorScheme={status === 'Delivered' ? 'green' : status === 'Shipped' ? 'blue' : 'yellow'}>{status}</Badge></Text>
        <Text><strong>Placed On:</strong> {new Date(createdAt).toLocaleString()}</Text>

        <Divider />

        <Heading size="md">User Info</Heading>
        <Text><strong>Name:</strong> {user?.name}</Text>
        <Text><strong>Email:</strong> {user?.email}</Text>

        <Divider />

        <Heading size="md">Shipping Info</Heading>
        <Text><strong>Address:</strong> {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.state} - {shippingInfo?.pinCode}</Text>
        <Text><strong>Phone:</strong> {shippingInfo?.phoneNo}</Text>
        <Text><strong>Country:</strong> {shippingInfo?.country}</Text>

        <Divider />

        <Heading size="md" mb={2}>Products</Heading>
        {orderItems?.map((item) => (
          <Flex key={item._id} gap={4} align="center" py={2} borderBottom="1px solid #eee">
            <Image src={item.imageUrl} alt={item.name} boxSize="80px" objectFit="cover" borderRadius="md" />
            <Box>
              <Text fontWeight="bold">{item.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>Price: ${item.price}</Text>
            </Box>
          </Flex>
        ))}

        <Divider />

        <Flex justify="space-between" pt={4}>
          <Heading size="md">Total</Heading>
          <Heading size="md">${totalAmount}</Heading>
        </Flex>
      </Stack>
    </Box>
  );
};

export default AdminOrderDetails;
