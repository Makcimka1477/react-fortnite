import './shop.scss';
import { useState,useEffect,useReducer } from "react";
import useFetch from '../../hooks/useFetch';

import Items from './Items';
import Preloader from '../Preloader';

import reducer from "../../reducers/reducer";
import { addItemToBasket,removeItemFromBasket,getData } from "../../actionCreators/actionCreators";
import { MyShopContext } from '../../context/context';

const Shop = () => {
  const [state,dispatch] = useReducer(reducer);
  const { loader,error,getShopData } = useFetch();

  useEffect(() => {
    getShopData().then((data) => dispatch(getData(data)));
  },[])


  const removeFromBasket = (item) => {
    dispatch(removeItemFromBasket(item));
  }

  const addToBasket = (item) => {
    dispatch(addItemToBasket(item));
  }

  const loaderComp = !error && loader ? <Preloader /> : null;
  const errorComp = error ? <div>Error</div> : null;
  const itemsComp = !error && !loader ? <Items /> : null;

  const contextValue = {
    state,
    dispatch,
    addToBasket,
    removeFromBasket
  }

  return (
    <MyShopContext.Provider value={contextValue}>
      <main className="main">
        <div className="container">
          {loaderComp}
          {errorComp}
          {itemsComp}
        </div>
      </main >
    </MyShopContext.Provider>
  );
}

export default Shop;
