const urlHelper = {

  areasEndpoint: () => {
    return `/areas`;
  },

  areaEndpoint: (areaId) => {
    return `/areas/${areaId}`;
  },

  landmarksEndpoint: () => {
    return `/landmarks`;
  },

  landmarkEndpoint: (landmarkId) => {
    return `/landmarks/${landmarkId}`;
  },

  snippetEndpoint: (snippetId) => {
    return `/snippets/${snippetId}`;
  }

};

export default urlHelper;
