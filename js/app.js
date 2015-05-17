---
# main js file
---
var gallery;

$(document).ready(function() {
  initSwiper();
});

function initSwiper() {
  gallery = new Swiper ('.gallery', {
    spaceBetween: 10,
    loop: false
  });
}