import { APP_NAME } from '../config/branding';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p>
          &copy; {new Date().getFullYear()} {APP_NAME}
        </p>
        <p>Hecho para entrenar con constancia</p>
      </div>
    </footer>
  );
}

export default Footer;
