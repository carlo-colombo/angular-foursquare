token=''

app=angular.module 'test',['ngFoursquare']

app.config (FoursquareProvider) ->
  FoursquareProvider.token=token


app.controller 'ctrl',(Foursquare,$log) ->
  user = Foursquare.User.get({userId:'lit_car'})
  $log.info(user)
