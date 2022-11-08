import './cartItem.scss';

function CartItem ({ name,id,price,removeFromBasket,quantity,addToBasket }) {

  return (
    <div className="order-item">
      <span className="order-item__name">{name}</span>
      <span className="order-item__id">{id.length > 20 ? `${id.slice(0,20)}...` : id}</span>
      <span className="order-item__price">{price}$</span>
      <div className="order-item__button-group">
        <button onClick={addToBasket} className="up"></button>
        <span className="order-item__quantity">{quantity}</span>
        <button onClick={removeFromBasket} className="down"></button>
      </div>
      <span className="order-item__sum">{quantity * price}$</span>
    </div>
  );
}

export default CartItem;
