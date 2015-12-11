const urlHelper = {

  areasEndpoint: () => {
    return `/areas`;
  },

  areaEndpoint: (areaId) => {
    return `/areas/${areaId}`;
  },

  categorySnippetsEndpoint: (categoryId) => {
    return `/snippets/categories/${categoryId}`;
  },

  landmarksEndpoint: () => {
    return `/landmarks`;
  },

  landmarkEndpoint: (landmarkId) => {
    return `/landmarks/${landmarkId}`;
  },

  snippetEndpoint: (snippetId) => {
    return `/snippets/${snippetId}`;
  },

  landmarksSearchEndpoint: (query) => {
    return `/landmarks/search/${query}`;
  },

  getUrlParams: (queryString = window.location.search) => {
    // Create an array of paired params
    const params = queryString.substring(1)
                            .split('&')
                            .map(param => param.split('='));
    // Return an array containing maps of all params in unescaped format
    return params.reduce((memo, [key, value]) => memo.set(key, decodeURIComponent(value)), new Map());
  }

};

export default urlHelper;
