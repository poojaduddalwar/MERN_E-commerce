import { Box, Heading } from "@chakra-ui/react";
import ProductsTable from "./ProductsTable";


const Admin = () => {
    return (
        <Box p={4}>
            <Heading textAlign={'center'}>ADMIN</Heading>
            <Box m={4}>
                <ProductsTable />
            </Box>
        </Box>
    );
}

export default Admin;