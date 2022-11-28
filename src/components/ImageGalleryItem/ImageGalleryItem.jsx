import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <GalleryItem onClick={() => onClick(image.largeImageURL)}>
      <ImageGalleryItemImage src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};
