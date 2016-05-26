var apiURL_hearthstone = 'https://api.twitch.tv/kraken/streams?game=Hearthstone%3A%20Heroes%20of%20Warcraft&limit=6'
var favorites = ['deadmau5', 'freecodecamp', 'followgrubby']


favorites.forEach(function (stream){
  $.getJSON('https://api.twitch.tv/kraken/streams/'+stream+'?callback=?', function(data, status, xhr) {
    var streamerHeading = $('<h4></h4>')
    var streamerLink = $('<a target="_blank"></a>')
    var streamerDiv = $('<div class="twitch-streamer"></div>')
    var streamerLogo = $('<img class="streamlogo" alt="streamlogo">')
    var streamerDesc = $('<h3></h3>')
    if (data.stream === null) {
      streamerDesc.text('offline')
      streamerLogo.attr('src','http://placehold.it/360x180')
      streamerDiv.addClass('offline')
      streamerLink.attr('href', 'http://www.twitch.tv/' + stream)
    }
    else {
      if (data.stream["channel"]["status"].length > 10)
        streamerDesc.text(data.stream["channel"]["status"].substr(0, 20))
      else
        streamerDesc.text(data.stream["channel"]["status"])
      streamerLogo.attr('src', data.stream["preview"]["medium"])
      streamerDiv.addClass('online')
      streamerLink.attr('href', data.stream["channel"]["url"])
      }
    streamerHeading.text(stream)
    streamerLink.append(streamerDiv)
    streamerDiv.append(streamerHeading)
    streamerDiv.append(streamerLogo)
    streamerDiv.append(streamerDesc)
    $('#favorites').append(streamerLink)
})

})





function fillList(data, status, xhr) {
    var streams = data.streams
    for (var stream in streams) {
      var streamerHeading = $('<h4></h4>')
      var streamerLink = $('<a target="_blank"></a>')
      var streamerDiv = $('<div class="twitch-streamer"></div>')
      var streamerLogo = $('<img class="streamlogo" alt="streamlogo">')
      var streamerDesc = $('<h3></h3>')
      if (streams[stream]["channel"]["status"].length > 10)
        streamerDesc.text(streams[stream]["channel"]["status"].substr(0, 20))
      else
        streamerDesc.text(streams[stream]["channel"]["status"])
      streamerLogo.attr('src', streams[stream]["preview"]["medium"])
      streamerHeading.text(streams[stream]["channel"]["display_name"])
      streamerDiv.append(streamerHeading)
      streamerDiv.append(streamerLogo)
      streamerDiv.append(streamerDesc)
      streamerDiv.addClass('online')
      streamerLink.attr('href', streams[stream]["channel"]["url"])
      streamerLink.append(streamerDiv)
      $('#hearthstone').append(streamerLink)

  }
}
$.getJSON(apiURL_hearthstone, fillList)
