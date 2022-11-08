import ReactDOM from "react-dom";

const Portal = (props) => {
	const portalELem = document.createElement("div");
	document.body.append(portalELem);

	return ReactDOM.createPortal(props.children, portalELem);
};

export default Portal;
