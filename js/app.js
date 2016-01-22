(function(){
  'use strict';

  var coverSwiper = null,
      gallerySwiper = null,
      smallestImage = null,
      activeSlide = null;

  $(document).ready(function() {

    var coverOptions = {
      speed: 300,
      nextButton: ".cover-button-next",
      prevButton: ".cover-button-prev",
      loop: false,
      lazyLoading: true,
      lazyLoadingInPrevNext: true,
      onInit: function(swiper) {
        activeSlide = swiper.slides[swiper.activeIndex];
        setTooltips(swiper);
        //updateColor(swiper);
      },
      onSlideChangeEnd: function(swiper) {
        activeSlide = swiper.slides[swiper.activeIndex];
        setTooltips(swiper);
        //updateColor(swiper);
      }
    };

    var galleryOptions = {
      speed: 300,
      nextButton: ".gallery-button-next",
      prevButton: ".gallery-button-prev",
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: false,
      onInit: updateImages
      //lazyLoading: true,
      //lazyLoadingInPrevNext: true
    };

    var cover = $(".cover");
    cover.imagesLoaded( function() {
      cover.find(".swiper-slide").focusPoint();
      coverSwiper = new Swiper('.cover', coverOptions);
      cover.addClass("loaded");
    });

    var gallery = $(".project-content-gallery");
    gallery.imagesLoaded( function() {
      gallerySwiper = new Swiper('.project-content-gallery-swiper-container', galleryOptions);
      gallery.addClass("loaded");
    });

    $(window).on("resize", function() {updateImages(gallerySwiper)});
    //gallerySwiper.onResize(function(gallerySwiper) {updateImages(gallerySwiper)});

  });

	/**
   * Update the title attribute on the next/prev/current buttons
   * @param swiper
   */
  function setTooltips(swiper) {
    var nextSlide = swiper.slides[swiper.activeIndex + 1];
    var prevSlide = swiper.slides[swiper.activeIndex - 1];
    //console.log(activeSlide);
    if (nextSlide) $(".tooltip.cover-button-next").attr("title", $(nextSlide).attr("title"));
    if (prevSlide) $(".tooltip.cover-button-prev").attr("title", $(prevSlide).attr("title"));
    if (activeSlide) $(".tooltip.read-more").attr("title", "Read more about " + $(activeSlide).attr("title"));
  } //*/

	/**
   * Update the interface color on slide change
   * @param swiper
   * /
  function updateColor(swiper) {
    $(".site-header-person-information")
        .removeClass("dark")
        .removeClass("light")
        .addClass($(activeSlide).attr("data-image-color"));
  } //*/

  function updateImages(swiper) {
    if (!smallestImage) {
      var prevHeight = 999999;
      $.each(swiper.slides, function(i, slide) {
        var currentImage = $(slide).find("img");
        if (currentImage.height() < prevHeight) {
          prevHeight = currentImage.height();
          smallestImage = currentImage;
        }
      });
    }

    if (smallestImage) {
      $.each(swiper.slides, function(i, slide) {
        var currentImage = $(slide).find("img");
        // reset the height
        $(slide).css({
          height: "auto",
          width: "auto"
        });

        // calculate new width and height
        var r = currentImage.attr("width") / currentImage.attr("height");
        var smallestHeight = smallestImage.height();
        $(slide).css({
          height: smallestHeight,
          width: (smallestHeight * r)
        });

        swiper.update();
      });
    }
  }

})();