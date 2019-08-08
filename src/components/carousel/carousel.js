import $ from 'jquery';

const carousel = () => {
    var num = $('.my-card').length;
    var even = num / 2;
    var odd = (num + 1) / 2;

    if (num % 2 === 0) {
        $('.my-card:nth-child(' + even + ')').addClass('active');
        $('.my-card:nth-child(' + even + ')').prev().addClass('prev');
        $('.my-card:nth-child(' + even + ')').next().addClass('next');
    } else {
        $('.my-card:nth-child(' + odd + ')').addClass('active');
        $('.my-card:nth-child(' + odd + ')').prev().addClass('prev');
        $('.my-card:nth-child(' + odd + ')').next().addClass('next');
    }

    $('.my-card').click(function () {
        var slide = $('.active').width();
        if ($(this).hasClass('next')) {
            $('.card-carousel').stop(false, true).animate({ left: '-=' + slide });
        } else if ($(this).hasClass('prev')) {
            $('.card-carousel').stop(false, true).animate({ left: '+=' + slide });
        }

        $(this).removeClass('prev next');
        $(this).siblings().removeClass('prev active next');

        $(this).addClass('active');
        $(this).prev().addClass('prev');
        $(this).next().addClass('next');
    });


    $('html body').keydown(function (e) {
        if (e.keyCode === 37) {
            $('.active').prev().trigger('click');
        }
        else if (e.keyCode === 39) {
            $('.active').next().trigger('click');
        }
    });

    $('.leftarrow').click(function () {
        $('.active').prev().trigger('click');
    });


    $('.rightarrow').click(function () {
        $('.active').next().trigger('click');

    });


}

export default carousel;
