import "./message.scss";

const Message = ({ message }) => {
	const { id, name, quantity } = message;

	return (
		<div className="message-container">
			<div className="in-cart">Items added to cart:</div>
			<div className="message">
				<span>Name is: </span>
				{name}
			</div>
			<div className="message">
				<span>Quantity is: </span>
				{quantity}
			</div>
		</div>
	);
};

export default Message;
