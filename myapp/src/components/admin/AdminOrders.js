import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  useColorModeValue,
  Spinner,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState({});
  const [orderToUpdate, setOrderToUpdate] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [orderToDelete, setOrderToDelete] = useState(null);
  const navigate = useNavigate();

  const bg = useColorModeValue('white', 'gray.800'); 

  const {
    isOpen: isStatusModalOpen,
    onOpen: openStatusModal,
    onClose: closeStatusModal,
  } = useDisclosure();

  const {
    isOpen: isDeleteModalOpen,
    onOpen: openDeleteModal,
    onClose: closeDeleteModal,
  } = useDisclosure();

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/all`, {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmUpdateStatus = async () => {
    try {
      setStatusUpdating((prev) => ({ ...prev, [orderToUpdate]: true }));
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/update/${orderToUpdate}/status`, {
        status: newStatus,
      }, {
        withCredentials: true,
      });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderToUpdate ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [orderToUpdate]: false }));
      setOrderToUpdate(null);
      setNewStatus('');
      closeStatusModal();
    }
  };

  const deleteOrder = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/order/${orderToDelete}`, {
        withCredentials: true,
      });
      setOrders((prev) => prev.filter((order) => order._id !== orderToDelete));
    } catch (err) {
      console.error("Error deleting order", err);
    } finally {
      setOrderToDelete(null);
      closeDeleteModal();
    }
  };

  const handleStatusChange = (id, status) => {
    setOrderToUpdate(id);
    setNewStatus(status);
    openStatusModal();
  };

  const handleDelete = (id) => {
    setOrderToDelete(id);
    openDeleteModal();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box maxW="7xl" mx="auto" py={10} px={4}>
      <Heading mb={6} color="gray.700">
        Admin Orders
      </Heading>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : orders.length === 0 ? (
        <Text fontSize="lg" color="gray.500">
          No orders found.
        </Text>
      ) : (
        <TableContainer bg={bg} p={4} borderRadius="md" boxShadow="md">
          <Table variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>User</Th>
                <Th>Total</Th>
                <Th>Status</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order._id}</Td>
                  <Td>{order.user?.name || 'N/A'}</Td>
                  <Td>${order.totalAmount}</Td>
                  <Td>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      isDisabled={statusUpdating[order._id]}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </Select>
                  </Td>
                  <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button colorScheme="blue" size="sm" onClick={() => navigate(`/admin/order/${order._id}`)}>
                        View
                      </Button>
                      <Button colorScheme="red" size="sm" onClick={() => handleDelete(order._id)}>
                        Delete
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Status Confirmation Modal */}
      <Modal isOpen={isStatusModalOpen} onClose={closeStatusModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Status Update</ModalHeader>
          <ModalBody>Are you sure you want to change the order status to <strong>{newStatus}</strong>?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={closeStatusModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={confirmUpdateStatus}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Order</ModalHeader>
          <ModalBody>Are you sure you want to delete this order? This action cannot be undone.</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteOrder}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminOrders;
