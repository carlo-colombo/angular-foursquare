angular.module('ngFoursquare',["ngResource"])
  .constant('BASE_API_URL','https://api.foursquare.com/v2')
  .constant('encodeParam',function (data) {
    return data && Object.keys(data).map(function (k) {
      return encodeURI(k)+'='+encodeURI(data[k])
    }).join('&')  
  })
  .config(function ($provide,$resourceProvider,$httpProvider) {
    var $hp = angular.copy($httpProvider)
      ,$rp = angular.copy($resourceProvider)
      i = 0

    $provide.decorator('$cacheFactory',function ($delegate) {
      return function (cacheId,options) {
        if(cacheId=='$http'){
          cacheId+=''+i++
        }
        $delegate(cacheId,options)
      }
    })
    
    delete $hp.defaults.headers.common["X-Requested-With"]
    $provide.provider('$customHttp',$hp)
    $rp.$get[0]="$customHttp"
    $provide.provider('$customResource',$rp)
  })
  .provider('Foursquare',function (encodeParam) {
    var FoursquareProvider = {
    '$get': function ($customResource,$q,BASE_API_URL) {
      var $resource=$customResource
        ,params = {
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
        ,Lists: $resource(BASE_API_URL+'/lists/:listId/:aspect/:action',
          {},{
          get: {
            method:'GET',
            params: params
          },
          add: {
            method: 'POST',
            params: angular.extend({action:'add'}, params),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            transformRequest: encodeParam
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

