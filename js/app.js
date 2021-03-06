---
# main js file
---
var latestProjects, gallery, msnry, masonryContainer, masonryActive, imgLoaded;

$(document).ready(function() {
  
  setLazyLoaderHeight();

  gallery = new Swiper ('.gallery', {
    spaceBetween: 10,
    preloadImages: false,
    lazyLoading: true,
    lazyLoadingInPrevNext: false,
    setWrapperSize: true,
    loop: false
  });

  latestProjects = new Swiper ('.latest-projects', {
    spaceBetween: 14,
    slidesPerView: 1.5,
    preloadImages: false,
    lazyLoading: true,
    loop: false
  });

  masonryActive = false;
  imgLoaded = false;
  masonryContainer = $('main.index');
  masonryContainer.imagesLoaded( function() {
    imgLoaded = true;
    setUpMasonery();
    msnry = masonryContainer.data('masonry');
  });
  
  resizeLatestProjects();
  $(window).on('resize', function() {
    setLazyLoaderHeight();
    resizeLatestProjects();
    setUpMasonery();
    destroyMasonery();
  });

});


/**
 *  Calculate how many slides to show in the latest project section
 *  based on window width.
 */
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


function setLazyLoaderHeight() {
  var width = $('.gallery').width();
  var height = Math.ceil( (width / 16) * 9 );
  $('.gallery').find('.swiper-slide').css('height', height);
}

/**
 *  Set up Masonery when all images are loaded and if not alreddy set up 
 *  or in the mobile screen size threshold.
 */
function setUpMasonery() {
  var width = $(window).width();
  if ( width > 599 && !masonryActive && imgLoaded ) {
    masonryContainer.masonry({
      columnWidth: 200,
      gutter: 0,
      itemSelector: '.project-card'
    });
    masonryActive = true;
  }
}


/**
 *  Destroy masonery when transitioning from a lare screen to a small screen.
 */
function destroyMasonery() {
  var width = $(window).width();
  if ( width < 599 && masonryActive ) {
    msnry.destroy();
    masonryActive = false;
  }
}