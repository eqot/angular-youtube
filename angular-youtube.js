'use strict';

angular.module('AngularYouTube', [])
  .service('YouTube', function Youtube($http, $sce) {

    return {
      getVideoId: function (url) {
        var videoId = null;
        if (url.match(/^http:\/\/www.youtube.com\/watch\?v=([\w-]+).*/)) {
          videoId = RegExp.$1;
        }
        return videoId;
      },

      getInfo: function (videoId, callback) {
        $http.jsonp('http://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=jsonc&callback=JSON_CALLBACK')
          .success(function (res) {
            if (callback) {
              callback(res);
            }
          });
      },

      getDuration: function (duration) {
        // console.log(duration);
        if (!duration) {
          return null;
        }

        var sec = duration % 60;
        var min = Math.floor(duration / 60) % 60;
        var hour = Math.floor(duration / 3600);
        // console.log(hour + ':' + min + ':' + sec);
        return (hour > 0 ? hour + ':' : '') + min + ':' + (sec < 10 ? '0' + sec : sec);
      },

      getIFramePlayerUrl: function (videoId) {
        return $sce.trustAsResourceUrl('http://www.youtube.com/embed/' + videoId + '?enablejsapi=1');
      }
    };

  });
