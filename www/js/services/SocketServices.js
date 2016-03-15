(function() {
  angular.module('starter')
    .service('SocketService', ['socketFactory', SocketServices]);

  function SocketServices(socketFactory) {
    return socketFactory({
      ioSocket: io.connect('http://localhost:3000')
    });
  }

})();
