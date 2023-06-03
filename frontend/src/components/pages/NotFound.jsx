import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Header from '../regions/Header';
import image from '../../assets/NotFoundImg.svg';

const NotFound = ({ t }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    <div className="text-center">
      <Image className="h-25" fluid src={image} alt={t('notFound.title')} />
      <h1 className="h4 text-muted">{t('notFound.title')}</h1>
      <p className="text-muted">
        {t('notFound.footerFirst')}
        <Link to="/">{t('notFound.footerSecond')}</Link>
      </p>
    </div>
  </div>

);

export default NotFound;
