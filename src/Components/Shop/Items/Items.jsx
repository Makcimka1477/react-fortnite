import "./items.scss";
import Item from "./Item";
import Cart from "../../Cart/Cart";
import { useContext, useState } from "react";
import Portal from "../../Portal";
import Message from "../../Message";
import { MyShopContext } from "../../../context/context";

const Items = () => {
	const {
		state: { itemsData, order, quantity, message },
		removeFromBasket,
		addToBasket,
	} = useContext(MyShopContext);

	return (
		<div className="main__content">
			{message ? (
				<Portal>
					<Message message={message} />
				</Portal>
			) : null}

			<Cart />

			{itemsData &&
				itemsData.map((el) => (
					<Item
						addToBasket={() => addToBasket(el)}
						removeFromBasket={() => removeFromBasket(el)}
						order={order}
						key={el.id}
						{...el}
					/>
				))}
		</div>
	);
};

export default Items;
