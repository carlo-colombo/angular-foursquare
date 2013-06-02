angular.module('ngFoursquare',["ngResource"])
    .constant('BASE_API_URL','https://api.foursquare.com/v2')
    .config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }])
    .constant('encodeParam',function (data) {
        return data && Object.keys(data).map(function (k) {
            return encodeURI(k)+'='+encodeURI(data[k])
        }).join('&')  
    })
    .provider('Foursquare',function (encodeParam) {
      var FoursquareProvider = {
        '$get': function ($resource,$q,BASE_API_URL) {
            var params = {
                    oauth_token: FoursquareProvider.token || ''
                    ,v: '20130425'
                }
                ,Foursquare = {
                token: function (token) {
                  FoursquareProvider.token = token
                }
                ,Users: $resource(BASE_API_URL+'/users/:userId/:action',
                    {},{
                    lists:{
                        method:'GET',
                        params: angular.extend({action:'lists'},params)
                    },
                    get:{
                        method:'GET',
                        params: params
                    }
                })
                ,Venues  : $resource(BASE_API_URL+'/venues/:venueId/:action',
                    {},{
                    search: {
                        method: 'GET'
                        ,params: angular.extend({action:'search'},params)
                    },
                    get: {
                        method: 'GET',
                        params: params
                    }
                })
                ,Checkins: $resource(BASE_API_URL+'/checkins/:checkinId/:action',
                    {},{
                    add: {
                        method: 'POST',
                        params: angular.extend({action:'add'},params),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: encodeParam
                    },
                    get: {
                        method: 'GET',
                        params: params
                    }
                })
                ,search:function (position) {
                    return $q.when(position).then(function (pos) {
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
