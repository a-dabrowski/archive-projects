var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

(function() {
    var i;
    for (i = 0; i < streamers.length; i++) {
        getChannel(streamers[i]);
    }
})();

function getChannel(nick) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/channels/' + nick + '?api_version=3&client_id=g2afe6rhpg6paznrbxyd50h5qyr0qhf',
        type: 'GET',
        statusCode: {
            404: function() {
                console.log(nick);
                $('#results-off').append('<div class="streamer offline"><h3>' + nick + '</h3><img src="https://image.freepik.com/free-icon/question-mark-on-a-circular-black-background_318-41916.png" class="user-img"><p>Account is closed</p></div>');
            },
            200: function(data) {
                if (data.game === null) {
                    $('#results-off').append('<div class="streamer offline"><h3>' + nick + '</h3><a href=' + data.url + ' target="_blank"><img class="user-img" src=' + data.logo + '></a><p>Channel is offline</p></div>');
                } else {
                    $('#results').append('<div class="streamer online"><h3>' + nick + '</h3><a href=' + data.url + ' target="_blank"><img class="user-img" src=' + data.logo + '></a><p>StreamName:' + data.game + '</p><span>' + data.status + '</span></div>');
                }
            },
            422: function() {
                $('#results-off').append('<div class="streamer offline"><h3>' + nick + '</h3> <img src="https://image.freepik.com/free-icon/question-mark-on-a-circular-black-background_318-41916.png" class="user-img"> <p>Account is closed</p></div>');
            }
        }
    });
}

$('#show-online').on('click', function() {
    $('.offline').each(function() {
        $(this).addClass('hide');
    });
    $('.online').each(function() {
        $(this).removeClass('hide');
    });
});

$('#show-offline').on('click', function() {
    $('.online').each(function() {
        $(this).addClass('hide');
    });
    $('.offline').each(function() {
        $(this).removeClass('hide');
    });
});

$('#show-all').on('click', function() {
    $('.streamer').each(function() {
        $(this).removeClass('hide');
    });
});
