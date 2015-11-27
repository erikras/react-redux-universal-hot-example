import assign from 'object-assign';
import urlHelper from './urlHelper';

export default {

  tracker: {
    'id': (process.env.NODE_ENV === 'production') ? 'UA-547495-15' : 'UA-547495-16',
    'name': 'm'
  },

  init() {
    this._initGA();
    this._initTracker(this.tracker.name, this.tracker.id);
  },

  logPageView(args) {
    let data = {
      hitType: 'pageview'
    };

    if (typeof args === 'string') {
      data = assign(data, { page: args });
    }

    ga(`${this.tracker.name}.send`, data);
  },

  sendEvent(category, action, label, args) {
    let data = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label
    };

    data = assign(data, args);

    ga(`${this.tracker.name}.send`, data);
  },

  // Set custom dimensions/metrics
  setCustom(property, value) {
    ga(`${this.tracker.name}.set`, property, value);
  },

  // Add products to enhanced ecommerce payload
  addProducts(products) {
    for (let product of products) {
      ga(`${this.tracker.name}.ec:addProduct`, product);
    }
  },

  // Add product impressions to payload
  addImpressions(products) {
    for (let product of products) {
      ga(`${this.tracker.name}.ec:addImpression`, product);
    }
  },

  // Set enhanced ecommerce action
  setAction(actionType, args={}) {
    ga(`${this.tracker.name}.ec:setAction`, actionType, args);
  },

  // Generate payloads for Ecommerce product lists
  generatePayload(item, args={}) {
    let data = {
      id: item.id,
      name: item.name,
      brand: item.author_username
    }

    return assign(data, args);
  },

  // Private functions

  // Load base GA tracking code
  _initGA() {
    // Use the `?ga_debug=potato` URL param to see GA console debug info
    const useDebug = urlHelper.getUrlParams().get('ga_debug');

    if (useDebug) {
      window.ga_debug = { trace: true };

      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)}
      )(window,document,'script','https://www.google-analytics.com/analytics_debug.js','ga');
    } else {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)}
      )(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    }
  },

  // Instantiate GA tracker
  _initTracker(name, ua, args) {
    let data = {
      name: name,
      allowLinker: true
    };

    data = assign(data, args);

    window.ga('create', ua, 'auto', data);
    window.ga(`${name}.require`, 'ec');
    window.ga(`${name}.require`, 'displayfeatures');
    window.ga(`${name}.require`, 'linkid', 'linkid.js');
  }
}
