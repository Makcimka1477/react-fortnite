import './cart.scss';
import cart from '../../images/cart.png';
import CartItem from "./CardItem/CartItem";
import Preloader from "../Preloader";

import { useContext,useEffect,useState } from "react";
import useFetchPost from '../../hooks/useFetchPost';

import { MyShopContext } from "../../context/context";
import { cartIsOpenAC,resetOrder } from "../../actionCreators/actionCreators";

function Cart () {
  const { state: { order,cartIsOpen },dispatch,removeFromBasket,addToBasket,finishCartPost } = useContext(MyShopContext);
  const { loader,error,postCartData } = useFetchPost();
  // const [finishCartPost,setFinish] = useState('');


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
        const closeTrigger = document.querySelector('.order-wrapper');
        if (e.target === closeTrigger) {
          dispatch(cartIsOpenAC(false))
        }
      }
    }

    const closeOnButton = (e) => {
      if (cartIsOpen) {
        if (e.code === 'Escape') {
          dispatch(cartIsOpenAC(false));
        }
      }
    }

    window.addEventListener('keydown',closeOnButton);
    window.addEventListener('click',closeCart);

    return () => {
      window.addEventListener('keydown',closeOnButton);
      window.removeEventListener('click',closeCart);
    };
  },[cartIsOpen]);



  const onSubmitOrder = (e) => {
    e.preventDefault();

    if (order.length === 0 || !order) return;

    const formattedOrder = order.map(el => {
      return {
        name: el.name,
        id: el.id,
        quantity: el.quantity,
        price: el.price,
      }
    });

    postCartData(formattedOrder)
      .catch((err) => { throw new Error('Error: ',err) })
      .then((data) => {
        dispatch(resetOrder());
        dispatch(finishCartPost('Your order successed. Thank you!'));
        setTimeout(() => {
          dispatch(cartIsOpenAC(false));
          dispatch(finishCartPost(''));
        },3000)
      });
  }

  return (
    <>
      {
        !cartIsOpen &&
        <div onClick={() => dispatch(cartIsOpenAC(true))} className="cart">
          <span className='cart__quantity'>{order.length}</span>
          <img className="cart__img" src={cart} alt='cart-image' />
        </div>
      }
      {cartIsOpen &&
        <div onSubmit={onSubmitOrder} className="order-wrapper">
          <div className="order container">
            <div className="order__content">

              <div onClick={() => dispatch(cartIsOpenAC(false))}
                className='order__cart-close'>
                &times;
              </div>

              {
                order.length > 0 && !loader && !error && order.map(el => (
                  <CartItem addToBasket={() => addToBasket(el)} removeFromBasket={() => removeFromBasket(el)} key={el.id} {...el} />
                ))}

              {order.length === 0 && !loader && !error &&
                <div className="empty-cart">
                  {finishCartPost ?
                    <div>
                      {finishCartPost}
                    </div>
                    : <div>
                      Cart is empty
                    </div>
                  }
                </div>
              }
              {loader && !error && <div><Preloader /></div>}
              {error && !loader && <div>ERROR</div>}



            </div>
            {order.length > 0 && cartIsOpen ?
              <form className="order__sum">
                <span>Total count: {totalCount}</span>
                <span>Total sum: {totalSum}$</span>
                <button className="order__pay-button">Pay it now</button>
              </form>
              : null}
          </div>
        </div>
      }
    </>
  );
}
export default Cart;
