const urlHelper = {

  landmarksEndpoint: () => {
    return `/api/landmarks`;
  },

  landmarkEndpoint: (landmarkId) => {
    return `/api/landmarks/${landmarkId}`;
  },

  snippetEndpoint: (snippetId) => {
    return `/api/snippets/${snippetId}`;
  }

};

export default urlHelper;
