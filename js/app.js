---
# main js file
---
var latestProjects, gallery, msnry, masonryContainer, masonryActive, imgLoaded;

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

  masonryActive = false;
  imgLoaded = false;
  masonryContainer = $('main.index');
  masonryContainer.imagesLoaded( function() {
    console.log('Images loaded!');
    imgLoaded = true;
    setUpMasonery();
    msnry = masonryContainer.data('masonry');
  });
  

  resizeLatestProjects();
  $(window).on('resize', resizeLatestProjects);
  $(window).on('resize', setUpMasonery);
  $(window).on('resize', destroyMasonery);

});

function resizeLatestProjects() {
  if (latestProjects.container.length) {
    var width = $(window).width();
    
    if ( width > 900 ) {
      console.log('big!');
      latestProjects.params.slidesPerView = 4.5;
    }
    
    else if ( width > 700 && width < 899 ) {
      console.log('medium!');
      latestProjects.params.slidesPerView = 3.5;
    }
    
    else if ( width > 500 && width < 699 ) {
      console.log('small!');
      latestProjects.params.slidesPerView = 2.5;
    }
    
    else if ( width < 499 ) {
      console.log('tiny!');
      latestProjects.params.slidesPerView = 1.5;
    }

    latestProjects.update();
  }
}

function setUpMasonery() {
  var width = $(window).width();
  if ( width > 599 && !masonryActive && imgLoaded ) {
    console.log('ENABLE masonry');
    masonryContainer.masonry({
      columnWidth: 200,
      gutter: 0,
      itemSelector: '.project-card'
    });
    masonryActive = true;
  }
}

function destroyMasonery() {
  var width = $(window).width();
  if ( width < 599 && masonryActive ) {
    console.log('DESTROY masonry');
    msnry.destroy();
    masonryActive = false;
  }
}