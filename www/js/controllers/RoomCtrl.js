(function() {
  angular.module('starter')
    .controller('RoomCtrl', ['$scope', '$state','localStorageService','SocketService', 'moment','$ionicScrollDelegate', RoomCtrl]);

  function RoomCtrl($scope, $state, localStorageService, SocketService, moment, $ionicScrollDelegate ){

    var me = this;

    me.messages =[];
    $scope.humanize = function(timestamp) {
      return moment(timestamp).fromNow();
    };
    me.currentRoom = localStorageService.get('room');

    var currentUser = localStorageService.get('userName');

    $scope.isNotCurrentUser = function(user) {
      if(currentUser != user) {
        return 'not-currenr-user';
      }
      return 'current-user';
    };
    $scope.sendTextMessage = function() {
      var msg = {
        'room': me.currentRoom,
        'user': currentUser,
        'text': me.message,
        'time': moment()
      };
      me.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();

      me.message = '';

      SocketService.emit('send:message', msg);
    };
    $scope.leaveRoom = function() {
      var msg = {
        'user': currentUser,
        'room': me.currentRoom,
        'time': moment()
      };
      SocketService.emit('leave:room', msg);
      $state.go('rooms');
    };

    SocketService.on('message', function(msg){
      me.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });
  }
})();
