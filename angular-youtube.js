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

  })

  .directive('youtubeUploader', function () {
    return {
      restrict: 'E',
      // template: '<div id="youtube-upload-widget"><div>';
      template: '<iframe id="widget" type="text/html" width="640" height="390" src="https://www.youtube.com/upload_embed" frameborder="0"></iframe>',
      link: function preLink(scope) {
        var tag = document.createElement('script');
        tag.src = 'http://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    };
  });

/*
function onYouTubeIframeAPIReady() {
  console.log('ok');

  var widget = new YT.UploadWidget('youtube-upload-widget', {
    width: 500,
    // events: {
    //   'onUploadSuccess': onUploadSuccess,
    //   'onProcessingComplete': onProcessingComplete
    // }
  });
  // widget.setVideoTitle('title');
  // widget.setVideoDescription('description');
  // widget.setVideoPrivacy('unlisted');
};
*/
