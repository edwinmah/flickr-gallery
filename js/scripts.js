//===========================================
//! dynamically add Flickr photos from feed
//===========================================

(function() {
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    id: "35591378@N03",
    format: "json"
  })
    .done(function( data ) {

      var flickrUser = ': <span><a href="' + data.link + '">' + data.title + '</a></span>';
      var output = '';

      for (var i = 0; i < data.items.length; i++) {
        var photoTitle = data.items[i].title;
        var photoSmall = data.items[i].media.m;
        var photoLarge = photoSmall.replace('_m', '_b');

        output += '<a href="' + photoLarge + '" title="' + photoTitle + '" class="image-popup">';
        output += '<img src="' + photoSmall + '" alt="' + photoTitle + '">';
        output += '</a>';
      }

      $('.site-title').append(flickrUser);
      $('#photos').html(output); // inject content and markup into DOM

    });
})();


//=================
//! magnific popup
//=================
$(document).ready(function() {

  // bind click event to #photos element
  $('#photos').on('click', '.image-popup', function(e) {

    // stop default click behavior
    e.preventDefault();

    $(this).magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-img-mobile',
      image: {
        verticalFit: true
      }
    }).magnificPopup('open');

  }); // end #photos click event
}); // end document ready