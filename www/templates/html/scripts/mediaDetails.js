var jQuery = $;
var player = null;
var mediaDetails = (function($) {
    var video;

    return {
        imageBaseURL: 'http://itunes.unl.edu/thumbnails.php?url=',

        setVideoType : function(){

        },

        getImageURL: function() {
            return mediaDetails.imageBaseURL + $('#player').attr('src');
        },

        updateDuration: function() {
            if (!player) {
                $('#itunes_duration').attr('value', mediaDetails.findDuration(WDN.videoPlayer.createFallback.getCurrentInfo('duration')));
            } else {
                WDN.log(player.media.duration);
                $('#itunes_duration').attr('value', mediaDetails.findDuration(player.media.duration));
            }
        },

        findDuration: function(duration) {
            return mediaDetails.formatTime(duration);
        },

        updateThumbnail: function(currentTime) {
            $('#imageOverlay').css({'height' : $("#thumbnail").height()-20 +'px' ,'width' : $("#thumbnail").width()-60 +'px' }).show();

            var src = mediaDetails.getImageURL() + '&time='+mediaDetails.formatTime(currentTime)+'&rebuild';

            WDN.log(src);

            $.ajax(src).always(function() {
                $('#thumbnail').attr('src', src.replace('&rebuild', ''));
                $('#imageOverlay').hide();
            });
        },

        currentPostion: function(video) {
            return mediaDetails.formatTime(video.currentTime);
        },

        formatTime: function(totalSec) { //time is coming in milliseconds
            WDN.log(totalSec);
            hours = parseInt( totalSec / 3600 ) % 24;
            minutes = parseInt( totalSec / 60 ) % 60;
            seconds = Math.round(((totalSec % 60)*100)/100);

            return ((hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds));
        },

        /**
         * Check if the given URL meets requirements
         *
         * @return bool
         */
        validURL: function(url) {
            unl_check = /^http:\/\/([^\/]+)\.unl\.edu\/(.*)/;
            var r = unl_check.exec(url);
            if (r == null) {
                alert('Sorry, you must use a .unl.edu URL, or upload a valid file.');
                return false;
            }
            return true;
        },

        // Grab the preview markup for the URL requested
        getPreview: function(url) {
            $('#headline_main').html('Generating a thumbnail and setting up the media player.');
            WDN.get('?view=mediapreview&format=partial&url='+url, function(data, textStatus) {
                // Place the preview markup into the preview div
                $('#headline_main').html(data).ready(function() {
                    mediaDetails.scalePlayer();
                });
            });
        },

        scalePlayer: function() {
            // Now scale down the player
            var thumbnail = new Image();
            thumbnail.src = $('#thumbnail').attr('src')+'&time='+mediaDetails.formatTime(0);
            thumbnail.onload = function(){
                var calcHeight = (this.height * 460)/this.width;
                $('#player').attr('height', calcHeight).attr('width', 460).ready(function() {
                    jQuery.getScript('/wdn/templates_3.1/scripts/plugins/mediaelement/mediaelement-and-player.min.js', function() {
                        player = new MediaElementPlayer('#player');
                    });
                });
                $('#videoDisplay object').attr('style', 'width:460px;height:'+calcHeight);
                $('#thumbnail').attr('src', thumbnail.src);
            };
            thumbnail.onerror = '';
        }
    };
})(WDN.jQuery);

WDN.jQuery(document).ready(function($) {
    if (formView == 'edit') { //we're editting, so hide the introduction and go straight to the form
        $("#feedlist").hide();
        $("#formDetails, #formDetails form, #formDetails fieldset, #continue3").not("#addMedia").css({"display" : "block"});
        $(".headline_main").css({"display" : "inline-block"});
        $("#formDetails").removeClass("two_col right").addClass('four_col left');
        if (mediaType == 'video') {
            mediaDetails.scalePlayer();
        }
        $("#fileUpload").hide();
    }

    $("#mediaSubmit").click(function(event) { //called when a user adds video
        if (document.getElementById("file_upload").value == '') {
            if (!mediaDetails.validURL(document.getElementById("url").value)) {
                return false;
            }
            mediaDetails.getPreview($("#url").val());
            event.preventDefault();
        } else {
            // Hide the url field, user is uploading a file
            $('#media_url').closest('li').hide();
        }

        $('#fileUpload').hide();

        $("#addMedia, #feedlist").slideUp(400, function() {
            $("#headline_main").slideDown(400, function() {
                $("#media_form").show().css({"width" : "930px"}).parent("#formDetails").removeClass("two_col right");
                $("#existing_media, #enhanced_header, #feedSelect, #maincontent form.zenform #continue3").slideDown(400);
                $("#media_url").attr("value", $("#url").val());
                $(this).css('display', 'inline-block');
            });
        });

    });

    $('a#setImage').live('click', function() {
        var currentTime;
        if (!player) {
            currentTime = WDN.videoPlayer.createFallback.getCurrentPosition() + .01;
        } else {
            currentTime = player.getCurrentTime();
        }

        mediaDetails.updateThumbnail(currentTime);

        return false;
    });

    // Deal with the outpost extra information
    $("#itunes_header ol").hide();
    $("#mrss_header ol").hide();

    $("#itunes_header legend").click(function() {
      $("#itunes_header ol").toggle(400);
      return false;
    });
    $("#mrss_header legend").click(function() {
      $("#mrss_header ol").toggle(400);
      return false;
    });
    WDN.initializePlugin('modal', [function() {
        $('span.embed').colorbox({inline: true, href:'#sharing', width:'600px', height:'310px'});
    }]);
    $.validation.addMethod('geo_long', 'This must be a valid longitude.', {min:-180, max:180});
    $.validation.addMethod('geo_lat', 'This must be a valid latitude.', {min:-90, max:90});
    $('#media_form').validation();

    $('#media_form').submit(function() {
        $('#continue3').attr('disabled', 'disabled');
    })

    // Collapisible forms
    $('.collapsible > legend').append("<span class='toggle'>Expand</span>");
    $('.collapsible > ol').hide();
    $('.collapsible > legend').click(function() {
        if ($(this).next('ol').is(":visible")) {
            $(this).next('ol').hide(200);
            $(this).find('.toggle').html('Expand');
        } else {
            $(this).next('ol').show(200);
            $(this).find('.toggle').html('Collapse');
        }
    });
});

WDN.loadJS("http://www.unl.edu/wdn/templates_3.0/scripts/plugins/tinymce/jquery.tinymce.js", function() {
    WDN.jQuery("textarea#description").tinymce({
        // Location of TinyMCE script
        script_url: "http://www.unl.edu/wdn/templates_3.0/scripts/plugins/tinymce/tiny_mce.js",
        theme: "advanced",
        skin: "unl",

        // Theme options
        theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,|,bullist,numlist,|,link,unlink,anchor,|,removeformat,cleanup,help,code,styleselect,formatselect",
        theme_advanced_buttons2: "",
        theme_advanced_buttons3: "",
        theme_advanced_toolbar_location: "top",
        theme_advanced_toolbar_align: "left",
        theme_advanced_statusbar_location: "bottom",
        theme_advanced_resizing: true,
        theme_advanced_row_height: 33
    });
});