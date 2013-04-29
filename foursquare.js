angular.module('ngFoursquare',["ngResource","ngGeolocation"])
    .constant('BASE_API_URL','https://api.foursquare.com/v2')
    .config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
        delete $httpProvider.defaults.headers.common["Access-Control-Request-Headers"]
        delete $httpProvider.defaults.headers.common["Access-Control-Request-Method"]
    }])
    .provider('Foursquare',function () {
      var FoursquareProvider = {
        '$get': function ($resource,$q,BASE_API_URL,geolocation) {
            var params = {
                    oauth_token: FoursquareProvider.token
                    ,v: '20130425'
                }
                ,Foursquare = {
                token: function (token) {
                  FoursquareProvider.token = token
                }
                ,Venues  : $resource(BASE_API_URL+'/venues/:VENUE_ID/:action',
                    {VENUE_ID:'@venueId'},{
                    search: {
                        method: 'GET'
                        ,params: angular.extend({ action:'search'},params)
                    },
                    get: {
                        method: 'GET',
                        params: params
                    }
                })
                ,Checkins: $resource(BASE_API_URL+'/checkins/:CHECKIN_ID/:action',
                    {CHECKIN_ID:'@checkinId'},{
                    add: {
                        method: 'POST',
                        params: angular.extend({ action:'add'},params)
                    },
                    get: {
                        method: 'GET',
                        params: params
                    }
                })
                ,search:function () {
                    return geolocation.position()
                        .then(function (pos) {
                            var c = pos.coords,
                                ll = "" + c.latitude + "," + c.longitude
                            return ll
                        })
                        .then(function (ll) {
                            var deferred = $q.defer()
                            Foursquare.Venues.search({
                                ll:ll
                            },deferred.resolve,deferred.reject)
                            return deferred.promise
                        })
                }
            }
            return Foursquare
        }
      }
      return FoursquareProvider
    })
