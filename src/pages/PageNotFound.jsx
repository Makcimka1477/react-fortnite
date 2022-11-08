import "./pageNotFound.scss";
import notFound404 from "../images/notFound404.webp";

const PageNotFound = () => {
	return (
		<div className="page-not-found">
			<p>We are sorry but the page you are looking for does not exist.</p>
			<img
				src={notFound404}
				alt="error 404 not found"
			/>
		</div>
	);
};

export default PageNotFound;
