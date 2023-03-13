import { devToolsEnhancer } from "@redux-devtools/extension";
import { createStore } from "redux";
// Початкове значення стану Redux для кореневого редюсера,
// якщо не передати параметр preloadedState.
const initialState = {
    pressedKey: '',
    products: JSON.parse(localStorage.getItem("products")) ?? [],
    showDetails: false,
};

export const deleteProduct = (productId) => { // actionCreator
    return {
        type: "products/deleteProduct",
        payload: productId,
    }
}

export const addProduct = (product) => { // actionCreator
    return {
        type: "products/addProduct",
        payload: product,
    }
}

export const setPressedKey = (keyName) => { // actionCreator
    return {
        type: "userAction/setPressedKey",
        payload: keyName,
    }
}

export const setToggleShowDetails = () => { // actionCreator
    return {
        type: "userAction/setToggleShowDetails",
    }
}

/*

    { - action
            type: "products/deleteProduct",
            payload: productId,
    }

    { - action
        type: "products/addProduct",
        payload: product,
    }
*/

// Поки що використовуємо редюсер який
// тільки повертає отриманий стан
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case "userAction/setToggleShowDetails": {
            return {
                ...state,
                showDetails: !state.showDetails
            };
        }
        case "products/deleteProduct": {
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.payload),
            };
        }
        case "userAction/setPressedKey": {
            return {
                ...state,
                pressedKey: action.payload,
            };
        }
        case "products/addProduct": {
            if (state.products.some((p) => p.title === action.payload.title)) {
                alert(`Oops, product ${action.payload.title} is already in your list`);
                return state;
            }
          
            const finalProduct = {
                id: (Math.random() * 100).toString(),
                ...action.payload,
            };

            return {
                ...state,
                products: [finalProduct, ...state.products]
            };
        }
        default:  return state;
    }
 
};

// Створюємо розширення стора, щоб додати інструменти розробника
const enhancer = devToolsEnhancer();

export const store = createStore(rootReducer, enhancer);