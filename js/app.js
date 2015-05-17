---
# main js file
---
$(document).ready(function() {

  var gallery = new Swiper ('.gallery', {
    spaceBetween: 10,
    loop: false
  });

  var latestProjects = new Swiper ('.latest-projects', {
    spaceBetween: 14,
    slidesPerView: 1.5,
    loop: false
  });

});