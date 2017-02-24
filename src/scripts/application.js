$(document).ready(function() {

    // Toggle lightbox component
    // --------------------------------------------------------------------------

    // $('[data-toggle="modal"]').on('click', function(e) {
    // 
    //     e.preventDefault();
    // 
    //     $(".Modal").addClass('is-displayed');
    // });
    // 
    // $('[data-dismiss="modal"]').on('click', function(e) {
    // 
    //     e.preventDefault();
    // 
    //     var modalClose = $(this),
    //         modalWindow = modalClose.parents(".Modal"),
    //         modalVideo = modalWindow.find("video");
    // 
    //     $(".Modal").removeClass('is-displayed');
    //     // modalVideo.get(0).pause();
    // });


    // Animate input label on :focus
    // @url: http://codepen.io/oknoblich/pen/wFGIH
    // --------------------------------------------------------------------------

    $('input, textarea').each(function() {
        $(this).on('focus', function() {
            $(this).parent('.form-group').addClass('is-active');
        });
        $(this).on('blur', function() {
            if ($(this).val().length == 0) {
                $(this).parent('.form-group').removeClass('is-active');
            }
        });
        if ($(this).val() != '') {
            $(this).parent('.form-group').addClass('is-active');
        }
    });

    $("label").click(function() {
        var labelID = $(this).attr("for");
        $("#" + labelID).focus()
    })

    // Make a div a link on mobile
    // @url: https://ctrlq.org/code/19639-turn-div-clickable-link
    // --------------------------------------------------------------------------

    // $(".Card").on ("click", function(e) {
    // 
    //     if ($(window).width() < 767) {
    // 
    //         e.preventDefault();
    // 
    //         // window.location = $(this).find("a:first").attr("href");
    //         window.location = $(this).attr("href");
    //         return false;
    //     }
    // 
    // });
    
    
    
    // gumshoe
    gumshoe.init({
        offset: 150
    });

});
