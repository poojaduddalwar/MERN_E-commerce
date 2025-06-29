import {
    Button,
    Flex,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import axios from 'axios'


const OrderSummaryItem = (props) => {
    const { label, value, children } = props
    return (
        <Flex justify="space-between" fontSize="sm">
            <Text fontWeight="medium" color={mode('gray.600', 'gray.400')}>
                {label}
            </Text>
            {value ? <Text fontWeight="medium">{value}</Text> : children}
        </Flex>
    )
}

export const CartOrderSummary = ({ total }) => {
    const total1 = total * 100
    const loadScript = React.useCallback((src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }, [])

    const handleOrder = async () => {
        const token = localStorage.getItem("token");
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/v1/order/createOrder", {
            totalAmount: total1
            // amount: '50000'//in smallest denomination i.e paise means 50000 = 500
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // 👈 Add this line
            },
        });

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { totalAmount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_Ub3N5r8arx3FAJ", // Enter the Key ID generated from the Dashboard
            totalAmount: totalAmount.toString(),
            currency: currency,
            name: "+Plus.",
            description: "Test Transaction",
            image: 'https://www.svgrepo.com/show/174895/orkut-logo.svg',
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(process.env.REACT_APP_BACKEND_URL + "/api/v1/order/verify", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Pooja Duddalwar",
                email: "pgduddalwar2002@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Camp road",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
            <Heading size="md">Order Summary</Heading>

            <Stack spacing="6">
                $<OrderSummaryItem label="Subtotal" value={total} />
                <OrderSummaryItem label="Shipping + Tax">
                    <Link href="#" textDecor="underline">
                        + Free shipping
                    </Link>
                </OrderSummaryItem>
                {/* <OrderSummaryItem label="Coupon Code">
                    <Link href="#" textDecor="underline">
                        Add coupon code
                    </Link>
                </OrderSummaryItem> */}
                <Flex justify="space-between">
                    <Text fontSize="lg" fontWeight="semibold">
                        Total
                    </Text>
                    <Text fontSize="xl" fontWeight="extrabold">
                        ${total}
                    </Text>
                </Flex>
            </Stack>
            <Button onClick={handleOrder} colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
                Checkout
            </Button>
        </Stack>
    )
}