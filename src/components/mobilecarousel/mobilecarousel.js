import $ from 'jquery';

export const mobilecarousel = () => {

  var slider = function (containerElement) {
    if (containerElement.length > 1) {
      containerElement.each(function (index, element) {
        slider(containerElement.eq(index));
      });
      return;
    }

    var self = this;

    var slideIndex = 0;

    var innerSlider = containerElement.find(" .slider-inner");
    var slides = innerSlider.find(" .slider-slide");
    var firstSlide = slides.first();

    var previousButton = containerElement.find(".slider-previous");
    var nextButton = containerElement.find(".slider-next");

    var dotContainer = containerElement.find(".slider-dots");

    function dotClicked(e) {
      e.preventDefault();
      var targetSlideIndex = parseInt($(this).data("slide"), 10);
      self.slideToSlideIndex(targetSlideIndex);
    }

    function buildDots() {
      dotContainer.empty();
      for (var i = 0; i < slides.length; i++) {
        var dot = $('<a href="#" data-slide="' + i + '"></a>');
        dotContainer.append(dot)
        dot.click(dotClicked);
      }

      updateActiveDot();
    }

    function updateActiveDot() {
      var currentScrollLeft = innerSlider.scrollLeft();
      var scrollStepSize = firstSlide.width();
      var currentSlideIndex = Math.round(currentScrollLeft / scrollStepSize);

      var dots = dotContainer.find("> a");
      dots.removeClass("active");
      dots.filter("a[data-slide=" + currentSlideIndex + "]").addClass("active");
    }

    self.slideToSlideIndex = function (index) {
      var maxSlideIndex = innerSlider.find(" .slider-slide").length - 1;

      if (index < 0)
        index = maxSlideIndex;
      else if (index > maxSlideIndex)
        index = 0;

      slideIndex = index;

      var scrollStepSize = firstSlide.width();
      var newScrollLeft = slideIndex * scrollStepSize;

      innerSlider.stop().animate({ scrollLeft: newScrollLeft });
    }

    self.slideSlider = function (next) {
      slideIndex = slideIndex + (next ? 1 : -1);
      self.slideToSlideIndex(slideIndex);
    }

    previousButton.click(function (e) {
      e.preventDefault();
      self.slideSlider(false);
    });
    nextButton.click(function (e) {
      e.preventDefault();
      self.slideSlider(true);
    });

    innerSlider.scroll(function () {
      updateActiveDot();
    }).scroll();

    buildDots();
  }

  $(function () {
    var s = new slider($(".simple-slider"));
    s.slideSlider(true);
    s.slideToSlideIndex(3);
  });
}