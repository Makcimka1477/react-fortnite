import { FINISH_CART_POST,ADD_TO_BASKET_ACTION,REMOVE_FROM_BASKET_ACTION,GET_DATA,CART_IS_OPEN,RESET_ORDER } from "../actions/actions";

export const addItemToBasket = (itemToAdd) => ({ type: ADD_TO_BASKET_ACTION,payload: itemToAdd });
export const removeItemFromBasket = (itemToRemove) => ({ type: REMOVE_FROM_BASKET_ACTION,payload: itemToRemove });
export const getData = (data) => ({ type: GET_DATA,payload: data });
export const cartIsOpenAC = (isOpen) => ({ type: CART_IS_OPEN,payload: isOpen });
export const resetOrder = () => ({ type: RESET_ORDER });
export const finishCartPost = (text) => ({ type: FINISH_CART_POST,payload: text });