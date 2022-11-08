import { useMemo } from "react";
import { MyShopContext } from "../../../../context/context";
import "./item.scss";

const Item = ({
	id,
	name,
	descr,
	image,
	price,
	addToBasket,
	removeFromBasket,
	checkQuantityInOrder,
	order,
}) => {
	const quantity = useMemo(() => {
		const arr = order.filter((el) => el.id === id);
		return arr.length > 0 ? arr[0].quantity : null;
	}, [order]);

	return (
		<div className="card">
			<div
				className="card-info"
				data-image={image}>
				<img
					src={image}
					alt="hero"
				/>
				<h3 className="card-content__name">{name}</h3>
				<p className="card-content__description">{descr}</p>
			</div>
			<div className="card-content">
				<div className="card-content__buy-block">
					{!quantity ? (
						<button
							onClick={addToBasket}
							className="card-content__buy-btn">
							Купить
						</button>
					) : (
						<div>
							<button
								onClick={removeFromBasket}
								className="counter">
								<span>-</span>
							</button>
							<span>{quantity}</span>
							<button
								onClick={() => {
									addToBasket();
								}}
								// asdasdasdasdasd
								className="counter">
								<span>+</span>
							</button>
						</div>
					)}
					<span className="card-content__price">Price: {price}$</span>
				</div>
			</div>
		</div>
	);
};

export default Item;
