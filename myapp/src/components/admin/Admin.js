import { Box, Heading } from "@chakra-ui/react";
import ProductsTable from "./ProductsTable";
import AddProduct from "./AddProduct";


const Admin = () => {
    return (
        <Box p={4}>
            <Heading textAlign={'center'}>ADMIN</Heading>
            <Box m={4}>
                <ProductsTable />
            </Box>
            <Box m={4}>
                <AddProduct />
            </Box>
        </Box>
    );
}

export default Admin;