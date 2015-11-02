const urlHelper = {

  landmarksEndpoint: () => {
    return `/api/landmarks`;
  },

  landmarkEndpoint: (landmarkId) => {
    return `/api/landmarks/${landmarkId}`;
  }

};

export default urlHelper;
