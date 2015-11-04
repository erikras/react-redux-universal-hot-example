const urlHelper = {

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
