(function($, audiojs) {
    var controls_before = '';
    controls_before += '<div id="extended-controls-pre">';
    controls_before += '<span id="prev-track" class="glyphicon glyphicon-chevron-left"></span>';
    controls_before += '<span id="next-track" class="glyphicon glyphicon-chevron-right"></span>';
    controls_before += '</div>';
    
    var controls_after = '';
    controls_after += '<div id="extended-controls-post">';
    controls_after += '<div id="volume-container">';
    controls_after += '<span class="glyphicon glyphicon-volume-down"> </span>';
    controls_after += '<input id="volume-slider" type="range" min="0" max="1" step="0.01" value="0.5" />';
    controls_after += '<span class="glyphicon glyphicon-volume-up"> </span>';
    controls_after += '</div>';
    controls_after += '</div>';
    controls_after += '<div style="clear:both;"></div>';

    // Setup the player to autoplay the next track
    var a = audiojs.createAll({
        trackEnded: function() {
            var next = $('ol li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio.load($('a', next).attr('data-src'));
            audio.play();
        }
    });

    $.audiojs = $(".audiojs");
    $.audiojs.before( controls_before );
    $.audiojs.after( controls_after );

    // Load in the first track
    var audio = a[0];
    var volume = 0.5;

    function changeVolume( v )
    {
        if( v != volume )
        {
            volume = v;
            audio.setVolume(v);
        }
    }

    //audio support
    $("#volume-slider").change(function(evt){
        var v = $(this).val() * 0.01;
        changeVolume( v );
    });

    $("#volume-slider").mousemove(function(evt) {
        var v = $(this).val();
        changeVolume(v);
    });
    //end audio support

    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing');
    audio.load(first);

    // Load in a track on click
    $('ol li').click(function(e) {
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });

    $("#prev-track").click(function(e){
        var prev = $('li.playing').prev();
        if (!prev.length) prev = $('ol li').last();
        prev.click();
    });

    $("#next-track").click(function(e) {
        var next = $('li.playing').next();
        if (!next.length) next = $('ol li').first();
        next.click();
    });

    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('li.playing').prev();
            if (!prev.length) prev = $('ol li').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    })
})(jQuery, audiojs);