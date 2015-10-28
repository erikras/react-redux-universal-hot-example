const getSiteUrl = () => {
  if ("production" !== process.env.NODE_ENV) {
    return 'http://localhost:3333'
  } else {
    // return '//unstock.envato.com'
  }
}

const urlHelper = {

  landmarksEndpoint: () => {
    return `${getSiteUrl()}/api/landmarks`
  },

  landmarkEndpoint: (landmarkId) => {
    return `${getSiteUrl()}/api/landmarks/${landmarkId}`
  }

}

export default urlHelper;
