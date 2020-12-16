import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ pictures, onClickImage }) => {
  return (
    pictures.length > 0 && (
      <ul className={s.ImageGallery}>
        {pictures.map(({ webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={webformatURL}
            webformatURL={webformatURL}
            tags={tags}
            onClickImage={() => onClickImage(largeImageURL)}
          />
        ))}
      </ul>
    )
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string,
      // id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }),
  ),
  onClickImage: PropTypes.func.isRequired,
};
export default ImageGallery;
