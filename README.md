angular-foursquare
==================
foursquare module for angular
###How to use
set FoursquareProvider token with the oauth token from Foursquare 
    ```
    myapp.config(function(FoursquareProvider){
        FoursquareProvider.token = foursquare_oauth_token
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

test api at http://carlo-colombo.github.io/angular-foursquare/test-app/index.html
