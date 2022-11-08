import './footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__copyright">@Copyright 2022</div>
      <div className="footer__links">
        <a className="footer__link">
          instagram
          <img />
        </a>
        <a className="footer__link">
          facebook
          <img />
        </a>
        <a className="footer__link">
          twitter
          <img />
        </a>
      </div>
    </div >
  );
}

export default Footer;
