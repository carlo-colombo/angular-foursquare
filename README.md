angular-foursquare
==================
foursquare module for angular
###Configure
- Load `ngFoursquare` module in your app
- Initialize FoursquareProvider token with the oauth token from Foursquare 
```javascript
    myapp.config(function(FoursquareProvider){
        FoursquareProvider.token = foursquare_oauth_token
    })
```
###Use
angular-foursquare expose a Foursquare instance with rest resource (ngResource) `Users`, `Checkins` and `Venues`
```javascript
$scope.user = Foursquare.Users.get({
    userId: 'self' 
})
```
an helper method is exposed to search venues using a `Geoposition` object as argument (accepting a promise of a `Geoposition` too)
```javascript
navigator.geolocation.getCurrentPosition(function (pos) {
    $scope.$apply(function () {
        $scope.venues = Foursquare.search(pos) 
  })
})
```

###Available methods
- Users#get
- Users#lists
- Venues#search
- Venues#get
- Checkins#add
- Checkins#get
- search

Test application
================
http://carlo-colombo.github.io/angular-foursquare/test-app/index.html
