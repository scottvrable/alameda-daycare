var $         = require('jquery'),
    _template = require('lodash.template');

const INSTAGRAM_TOKEN   = '1069843734.1677ed0.7013f6f9d02a42278a454fd4999cfd68',
      INSTAGRAM_USER_ID = '1069843734',
      NUM_OF_IMAGES     = 3;

(() => {
  var instaTemplate = _template(
    `<li>
      <a href='<%- page_url %>' target='_blank'>
        <div class='insta-image-holder' style='background-image: url(<%- image_url %>)'></div>
        <div class='insta-caption'><%- text %></div>
      </a>
    </li>`
  );

  // parse Instagram feed and build list for display
  $.ajax({
    url: 'https://api.instagram.com/v1/users/' + INSTAGRAM_USER_ID + '/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: INSTAGRAM_TOKEN, count: NUM_OF_IMAGES},
    success: function(data) {
      data.data.forEach((insta) => {
        $('.instagram-feed-holder').append(
          instaTemplate({
            page_url: insta.link,
            image_url: insta.images.standard_resolution.url,
            text: insta.caption.text
          })
        );
      });
    }
  });
})();
