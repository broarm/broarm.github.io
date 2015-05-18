---
# main js file
---
var latestProjects, gallery;
$(document).ready(function() {

  gallery = new Swiper ('.gallery', {
    spaceBetween: 10,
    loop: false
  });

  latestProjects = new Swiper ('.latest-projects', {
    spaceBetween: 14,
    slidesPerView: 1.5,
    loop: false
  });

  if ($(window).width() > 599) {
    $('main.index').masonry({
      columnWidth: 200,
      gutter: 0,
      itemSelector: '.project-card'
    });
  }
  

  if (latestProjects.container.length) {
    resizeLatestProjects();
    $(window).on('resize', resizeLatestProjects);
  }
});

function resizeLatestProjects() {
  var width = $(window).width();
    
    if (width > 900) {
      console.log('big!');
      latestProjects.params.slidesPerView = 4.5;
      //latestProjects.update();
    }
    
    else if (width > 700 && width < 899) {
      console.log('medium!');
      latestProjects.params.slidesPerView = 3.5;
      //latestProjects.update();
    }
    
    else if (width > 500 && width < 699) {
      console.log('small!');
      latestProjects.params.slidesPerView = 2.5;
      //latestProjects.update();
    }
    
    else if (width < 499) {
      console.log('tiny!');
      latestProjects.params.slidesPerView = 1.5;
      //latestProjects.update();
    }

    latestProjects.update();
}