import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Button,
    Stack,
    Input,
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { deleteCategory } from "../../actions/category";
import { editCategory } from "../../actions/category";
import toast from "react-hot-toast";

const CategoriesTable = () => {
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {
        const res = await axios.get(
            process.env.REACT_APP_BACKEND_URL + "/api/v1/category/all"
        );
        // console.log(res.data)
        const { category } = res.data;
        setCategories(category);
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory(categoryId));
        setTimeout(getCategories, 1000);
    };

    const handleEdit = (category) => {
        setEditingCategory(category._id);
        setFormdata({
            name: category.name,
            description: category.description,
        });
    };

    const handleUpdate = (id) => {
        setLoading(true);
        dispatch(editCategory(id, formData))
            .then(() => {
                toast.success("Category Updated successfully");
                setEditingCategory(null);
                setTimeout(getCategories, 1000);
            })
            .catch((err) => {
                toast.error("Failed to Update Category");
            })
            .finally(() => setLoading(false));
    };

    return (
        <Table variant="simple">
            <TableCaption>All Categories</TableCaption>
            <Thead>
                <Tr>
                    <Th>ID</Th>
                    <Th>Category Name</Th>
                    <Th>Category Description</Th>
                </Tr>
            </Thead>
            <Tbody>
                {categories.map((category) => (
                    <>
                        <Tr key={category._id}>
                            <Td>{category._id}</Td>
                            <Td>
                                {editingCategory === category._id ? (
                                    <Input
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormdata({ ...formData, name: e.target.value })
                                        }
                                    />
                                ) : (
                                    category.name
                                )}
                            </Td>
                            <Td>
                                {editingCategory === category._id ? (
                                    <Input
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormdata({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    category.description
                                )}
                            </Td>
                            <Td>
                                <Stack direction="row" spacing={4} align="center">
                                    {editingCategory === category._id ? (
                                        <Button
                                            onClick={() => handleUpdate(category._id)}
                                            colorScheme="purple"
                                            isLoading={loading}
                                            loadingText="Saving"
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleEdit(category)}
                                            colorScheme="purple"
                                        >
                                            Edit
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => {
                                            handleDeleteCategory(category._id);
                                        }}
                                        colorScheme="red"
                                    >
                                        Delete
                                    </Button>
                                </Stack>
                            </Td>
                        </Tr>
                    </>
                ))}
            </Tbody>
        </Table>
    );
};

export default CategoriesTable;
