import './cart.scss';
import cart from '../../images/cart.png';
import CartItem from "./CardItem/CartItem";

import { useContext,useEffect,useState } from "react";
import { MyShopContext } from "../../context/context";
import { cartIsOpenAC } from "../../actionCreators/actionCreators";

function Cart () {
  const { state: { order,cartIsOpen },dispatch,removeFromBasket,addToBasket } = useContext(MyShopContext);

  (cartIsOpen) ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';

  const totalSum = order.length > 0 ? order.reduce((acc,next) => (
    !next.quantity ?
      acc + next.price :
      acc + next.price * next.quantity
  ),0) : 0;

  const totalCount = order.length > 0 ? order.reduce((acc,next) => acc + next.quantity,0) : 0

  useEffect(() => {
    const closeCart = (e) => {
      if (cartIsOpen) {
        const closeTrigger = document.querySelector('.order-container');
        if (e.target === closeTrigger) {
          dispatch(cartIsOpenAC(false))
        }
      }
    }

    window.addEventListener('click',closeCart);

    return () => {
      window.removeEventListener('click',closeCart);
    };
  },[cartIsOpen]);

  return (
    <>
      {!cartIsOpen ?
        <div onClick={() => dispatch(cartIsOpenAC(true))} className="cart">
          <span className='cart__quantity'>{order.length}</span>
          <img className="cart__img" src={cart} alt='cart-image' />
        </div>
        :
        <div className="order-wrapper">
          <div className="order container">
            <div className="order__content">
              <div onClick={() => dispatch(cartIsOpenAC(false))}
                className='order__cart-close'>
                &times;
              </div>
              {order.length > 0 ? order.map(el => (
                <CartItem addToBasket={() => addToBasket(el)} removeFromBasket={() => removeFromBasket(el)} key={el.id} {...el} />
              )) :
                <div className="empty-cart">
                  <div>
                    Cart is empty
                  </div>
                </div>}
            </div>
            <div className="order__sum">
              <span>Total count: {totalCount}</span>
              <span>Total sum: {totalSum}$</span>
              <button className="order__pay-button">Pay it now</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default Cart;
