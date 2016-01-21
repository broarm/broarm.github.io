(function(){
  'use strict';

  var coverSwiper;
  var activeSlide;

  $(document).ready(function() {
    var coverOptions = {
      speed: 300,
      nextButton: ".swiper-button-next",
      prevButton: ".swiper-button-prev",
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

    var cover = $(".cover");
    cover.imagesLoaded( function() {
      cover.find(".swiper-slide").focusPoint();
      coverSwiper = new Swiper('.cover', coverOptions);
      cover.addClass("loaded");
    });


  });

	/**
   * Update the title attribute on the next/prev/current buttons
   * @param swiper
   */
  function setTooltips(swiper) {
    var nextSlide = swiper.slides[swiper.activeIndex + 1];
    var prevSlide = swiper.slides[swiper.activeIndex - 1];
    //console.log(activeSlide);
    if (nextSlide) $(".tooltip.swiper-button-next").attr("title", $(nextSlide).attr("title"));
    if (prevSlide) $(".tooltip.swiper-button-prev").attr("title", $(prevSlide).attr("title"));
    if (activeSlide) $(".tooltip.read-more").attr("title", "Read more about " + $(activeSlide).attr("title"));
  } //*/

	/**
   * Update the interface color on slide change
    * @param swiper
   */
  function updateColor(swiper) {
    $(".site-header-person-information")
        .removeClass("dark")
        .removeClass("light")
        .addClass($(activeSlide).attr("data-image-color"));
  } //*/

})();