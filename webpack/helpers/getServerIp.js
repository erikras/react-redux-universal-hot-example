module.exports = {
  ip: function() {
    var os = require('os');
    var ifaces = os.networkInterfaces();
    var ip;
    Object.keys(ifaces).forEach(function (ifname) {
      ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        ip = (iface.address);
      });
    });
    return ip;
  }
}
