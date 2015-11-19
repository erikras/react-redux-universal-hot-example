import React, {Component, PropTypes} from 'react';
const SIZES = [ 'thumb', 'small', 'medium', 'large' ];

export default class Image extends Component {
  static propTypes = {
    image: PropTypes.object,
    size: PropTypes.string.isRequired,
    className: PropTypes.any
  }

  render() {
    const { className, image, size } = this.props;
    if (!image) {
      const missing = require('./missing.svg');
      const preview = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCAAYABgDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYFBwj/xAAmEAABAwQBAwQDAAAAAAAAAAABAgMEAAUGESESExUHFDFBUoGx/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEAP/EAB8RAAICAgIDAQAAAAAAAAAAAAECAAMEERIxQWFx8P/aAAwDAQACEQMRAD8A8O43jfnnXVvTW4kdrgrVyVK+gBVBG9O48p55DN3UoNEAq7XB3+6wMdursPqhMRFSHHl7ASdfVX1m8pJmKjxUKjOuj5XyNgccfdV02Y6ru0dfYqnEyci/ipIX1qcsuUPx93kwevr7Lhb6ta3o0qgzXFp+PTGZNwlCQ7MUtZUEdPII3/aVJyDHa9Sq6h6HNb9j94mPYbizachj3B9lTrbRJKEnRPBFXTHqZbI91ZmNWyWjt/itO90pQsoYaMOnKtpGkMwM8zeRmd0Yc9uI8SMkpZbOirnWyoj5J1SlKyIEHFeol3ZzyY7M/9k=';
      return (
        <svg style={{ backgroundColor: '#000', height: '100%', width: '100%' }}>
          <image width="100%" height="100%" xlinkHref={missing} src={`data:image/jpeg;base64,${preview}`} alt="" />
        </svg>
      );
    }

    const srcs = SIZES.map(dim => `${image[dim].src} ${image[dim].width}w`);
    const relevantSrcs = srcs.splice(SIZES.indexOf(size), SIZES.length).join(', ');

    return (
      <img src={image[size].src}
        width={image[size].width}
        height={image[size].height}
        style={{ backgroundImage: `url(data:image/jpeg;base64,${image.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        srcSet={relevantSrcs}
        className={className}
        alt=""
      />
    );
  }
}
