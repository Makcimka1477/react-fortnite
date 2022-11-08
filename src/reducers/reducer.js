import { REMOVE_FROM_BASKET_ACTION,ADD_TO_BASKET_ACTION,GET_DATA,CART_IS_OPEN } from '../actions/actions';

const initialState = {
    itemsData: null,
    order: [],
    message: null,
    cartQuantity: 0,
    cartIsOpen: false,
}

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case CART_IS_OPEN:
            return {
                ...state,cartIsOpen: action.payload
            }
        case GET_DATA:
            return {
                ...state,itemsData: action.payload
            }
        case REMOVE_FROM_BASKET_ACTION:
            const removeItemIndex = state.order.findIndex((el,i) => el.id === action.payload.id);

            if (state.order[removeItemIndex].quantity > 1) {
                const newQuantity = state.order[removeItemIndex].quantity - 1;

                return {
                    ...state,
                    order: state.order.map((el,i) => (
                        i === removeItemIndex ? { ...el,quantity: newQuantity } : el
                    )),
                    message: {
                        ...state.order[removeItemIndex],
                        quantity: newQuantity,
                    },
                    cartQuantity: state.cartQuantity - 1,
                }
            } else {
                return {
                    ...state,
                    order: state.order.filter((el,i) => i !== removeItemIndex),
                    message: '',
                    cartQuantity: state.cartQuantity - 1
                }
            }
        case ADD_TO_BASKET_ACTION:
            const newItem = {
                ...action.payload,
                quantity: 1,
            }

            const addItemIndex = state.order.findIndex((el) => el.id === action.payload.id);
            if (addItemIndex < 0) {
                return {
                    ...state,
                    order: [...state.order,newItem],
                    message: newItem,
                    cartQuantity: state.cartQuantity + 1
                }
            } else {
                const newQuantity = state.order[addItemIndex].quantity + 1;
                return {
                    ...state,
                    order: state.order.map((el,i) => (
                        i === addItemIndex ? { ...el,quantity: newQuantity } :
                            el
                    )),
                    message: {
                        ...state.order[addItemIndex],
                        quantity: newQuantity,
                        cartQuantity: state.cartQuantity + 1
                    }
                }
            }
        default:
            return state;
    }
}

export default reducer;