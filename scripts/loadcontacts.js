var app = angular.module('getContacts', []);
app.controller('getContactsController', function ($scope, $http){
    const headerDict = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Coockies.get('token'),
    }
    const requestOptions = {
        headers: new Headers(headerDict),
    };

    $http.get("../rest/contacts.php", requestOptions)
        .then(function (response) {$scope.users = response.msg;});
});