import { Box, Heading } from "@chakra-ui/react";
import ProductsTable from "./ProductsTable";
import CategoriesTable from "./CategoriesTable";
import AddProduct from "./AddProduct";
import AddCategory from "./AddCategory";


const Admin = () => {
    return (
        <Box p={4}>
            <Heading textAlign={'center'}>ADMIN</Heading>
            <Box m={4}>
                <ProductsTable />
            </Box>
            <hr />
            <Box m={4}>
                <CategoriesTable />
            </Box>
            <hr />
            <Box m={4}>
                <AddProduct />
            </Box>
            <hr />
            <Box m={4}>
                <AddCategory />
            </Box>
        </Box>
    );
}

export default Admin;