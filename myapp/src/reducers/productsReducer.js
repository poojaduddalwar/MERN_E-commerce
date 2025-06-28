/*
Products :
    imageUrl,
    productName,
    description,
    actualPrice,
    listingPrice,
    category: "whatever the category is",
    compatibleWith,
    color
*/


// const initialState = {
//     products: [
//         {
//             id: 1,
//             productName: "Watch Band",
//             description: "Comfort. Day in, day out. Stretchable recycled yarn interwoven with silicone threads designed for ultra-comfort with no buckles or clasps.",
//             actualPrice: "$50",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Watch Band",
//             compatibleWith: "Apple Watch 30mm, 40mm ,41mm",
//             color: "Pomegrenate",
//             stock: 40,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/Red-Fusion-38-40_1024x1024.jpg?v=1611006835'
//         }, {
//             id: 2,
//             productName: "Watch Band",
//             description: "Comfort. Day in, day out. Stretchable recycled yarn interwoven with silicone threads designed for ultra-comfort with no buckles or clasps.",
//             actualPrice: "$50",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Watch Band",
//             compatibleWith: "Apple Watch 42mm, 44mm ,45mm",
//             color: "Orange",
//             stock: 9,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/Pomegranate-40_1024x1024.jpg?v=1620410372'
//         }, {
//             id: 3,
//             productName: "Watch Band",
//             description: "Comfort. Day in, day out. Stretchable recycled yarn interwoven with silicone threads designed for ultra-comfort with no buckles or clasps.",
//             actualPrice: "$50",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Watch Band",
//             compatibleWith: "Apple Watch 42mm, 44mm ,45mm",
//             color: "Blue",
//             stock: 56,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/Sport_Loop-Midnight-40_1024x1024.jpg?v=1620410372'
//         }, {
//             id: 4,
//             productName: "Iphone 12 Case",
//             description: "Toned up for aesthetically pleasing design. Soft-coated silicone on the outside, and microfiber lining on the inside.",
//             actualPrice: "$40",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Iphone Case",
//             compatibleWith: "Iphone 12",
//             color: "Black",
//             stock: 100,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/12-Black_1024x1024.jpg?v=1604525686'
//         }, {
//             id: 5,
//             productName: "Iphone 12 Case",
//             description: "Toned up for aesthetically pleasing design. Soft-coated silicone on the outside, and microfiber lining on the inside.",
//             actualPrice: "$40",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Iphone Case",
//             compatibleWith: "Iphone 12",
//             color: "Yellow",
//             stock: 30,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/12-Sunflower_1024x1024.jpg?v=1630739597'
//         }, {
//             id: 6,
//             productName: "Iphone 12 Case",
//             description: "Toned up for aesthetically pleasing design. Soft-coated silicone on the outside, and microfiber lining on the inside.",
//             actualPrice: "$40",
//             listingPrice: "$39",
//             //TODO: use id instead of string in category
//             category: "Iphone Case",
//             compatibleWith: "Iphone 12",
//             color: "Orange",
//             stock: 19,
//             imageUrl: 'https://cdn.shopify.com/s/files/1/0984/6842/products/12-Mystery-Flame_1024x1024.jpg?v=1606412986'
//         }
//     ]
// }

const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: payload.products
            };
        case "DELETE_PRODUCT":
            return {
                ...state,
                products: state.products.filter(product => product._id !== payload)
            };
        case "EDIT_PRODUCT":
            return {
                ...state,
                products: [...state.products, payload.product]
            };
        case "DELETE_PRODUCT_FAILED":
            return state
        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, payload.product]
            }

        case "ADD_PRODUCT_FAILED":
            return state
        default:
            return state
    }
}

export default productReducer;