import React, {Component, PropTypes} from 'react';

export default class Image extends Component {
  static propTypes = {
    image: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired
  }

  render() {
    const { image, size } = this.props;
    return (
      <img src={image[size].src}
           width={image[size].width}
           height={image[size].height}
           style={{ backgroundImage: `url(data:image/jpeg;base64,${image.preview})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
           alt=""
           srcSet={`${image.thumb.src} ${image.thumb.width}w, ${image.small.src} ${image.small.width}w, ${image.medium.src} ${image.medium.width}w, ${image.large.src} ${image.large.width}w`}
          />
    );
  }
}
