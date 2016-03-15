(function() {
  angular.module('starter')
    .controller('HomeCtrl', ['$scope', '$state','$localStorageService','SocketService', HomeCtrl]);

    function HomeCtrl($scope, $state, localStorageService, SocketService) {

      var me = this;

      me.currentRoom = localStorageService.get('room');

      me.rooms = ['Coding', 'Art', 'Writing', 'Travel', 'Business', 'Photography'];

      $scope.login = function(roomName) {
        localStorageService.set('userName', userName);
        $state.go('rooms');
      };
      $scope.enterRoom = function(roomName) {
        me.currentRoom = roomName;
        localStorageService.set('room', roomName);

        var  room = {
          'roomName': roomName
        };

        SocketService.emit('join:room', room);

        $state.go('room');
      };
    }
})();
