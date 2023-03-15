import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pressedKey: "",
  products: [],
  showDetails: false,
};

const productsSlice = createSlice({
  // Ім'я слайсу
  name: "products",
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    setToggleShowDetails(state) {
      state.showDetails = !state.showDetails;
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addProduct(state, action) {
      if (state.products.some((p) => p.title === action.payload.title)) {
        alert(`Oops, product ${action.payload.title} is already in your list`);
        return state;
      }

      const finalProduct = {
        id: (Math.random() * 100).toString(),
        ...action.payload,
      };

      state.products = [finalProduct, ...state.products];
    },
    setPressedKey(state, action) {
      state.pressedKey = action.payload;
    },
  },
});

// Генератори екшенів
export const { setToggleShowDetails, deleteProduct, addProduct, setPressedKey } =
  productsSlice.actions;
// Редюсер слайсу
export const productsReducer = productsSlice.reducer;

// export const productsReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "userAction/setToggleShowDetails": {
//       return {
//         ...state,
//         showDetails: !state.showDetails,
//       };
//     }
//     case "products/deleteProduct": {
//       return {
//         ...state,
//         products: state.products.filter(
//           (product) => product.id !== action.payload
//         ),
//       };
//     }
//     case "userAction/setPressedKey": {
//       return {
//         ...state,
//         pressedKey: action.payload,
//       };
//     }
//     case "products/addProduct": {
//       if (state.products.some((p) => p.title === action.payload.title)) {
//         alert(`Oops, product ${action.payload.title} is already in your list`);
//         return state;
//       }

//       const finalProduct = {
//         id: (Math.random() * 100).toString(),
//         ...action.payload,
//       };

//       return {
//         ...state,
//         products: [finalProduct, ...state.products],
//       };
//     }
//     default:
//       return state;
//   }
// };
