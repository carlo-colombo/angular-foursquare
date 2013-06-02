angular-foursquare
==================
foursquare module for angular
###How to use
Initialize FoursquareProvider token with the oauth token from Foursquare 
```javascript
    myapp.config(function(FoursquareProvider){
        FoursquareProvider.token = foursquare_oauth_token
    })
```
Foursquare instance has property `Users`, `Checkins` and `Venues` and `search` method

###Available methods
- Users#get
- Users#lists
- Venues#search
- Venues#get
- Checkins#add
- Checkins#get
- search

test api at http://carlo-colombo.github.io/angular-foursquare/test-app/index.html
