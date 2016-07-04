(function($) {

    // Based on OUI's dropdown.js
    // See also Todd Motto's data attribute manipulations: https://goo.gl/dFE49n
    // Basics: http://stackoverflow.com/questions/2937227/what-does-function-jquery-mean

    function closeAllFolds() {

        var FOLD         = "[data-content-fold]";
        var FOLD_TOGGLE  = "[data-toggle-fold]";
        var ACTIVE_CLASS = "is-open";

        $(FOLD).removeClass(ACTIVE_CLASS);
        $(FOLD_TOGGLE).removeClass(ACTIVE_CLASS);
    }

    // Do only when screensize is >767px
    if ( $(window).width() > 767) {

        // Open a card 'fold' in the DOM
        $(document).on("click", "[data-toggle-fold]", function(e) {

            e.stopPropagation();

            // Close any open 'folds'.
            closeAllFolds();

            var FOLD_TOGGLE      = $(this),
                FOLD_TARGET      = FOLD_TOGGLE.parents('.js-cards').find('[data-content-fold=' + FOLD_TOGGLE.data('toggle-fold') + ']'),
                ACTIVE_CLASS     = "is-open";

            // If the clicked 'fold' is NOT open…
            if ( !FOLD_TARGET.hasClass(ACTIVE_CLASS) ) {
                // …open the clicked 'fold'.
                FOLD_TARGET.addClass(ACTIVE_CLASS);
                $(this).addClass(ACTIVE_CLASS);
            }

            // If the clicked 'fold' is open…
            // if ( FOLD_TARGET.hasClass(ACTIVE_CLASS) ) {
                // …close the clicked 'fold'.
                // closeAllFolds();
            // }

        });

        // Dismiss the open 'fold'
        $(document).on("click", "[data-dismiss='fold']", function(e) {

            e.stopPropagation();

            closeAllFolds();

        });

        // Clicking anywhere outside of dropdown.
        // Only attaches if a dropdown has been triggered.
        // $(document).bind('click.cardFold', function() {
        //
        //     var FOLD            = "[data-content-fold]";
        //     var ACTIVE_CLASS    = "is-open";
        //
        //     // If any dropdown is visible.
        //     if ( $(FOLD).hasClass(ACTIVE_CLASS) ) {
        //         ouiCloseAllDropdowns();
        //     }
        //
        //     $(document).unbind('click.cardFold');
        //
        // });

        // When screensize >767px, remove .Card's href
        // so that hrefs are available only on mobile
        $('[data-toggle-fold]').prop('href', function() {

            var removeLink = ('#');

            return removeLink;

        });

    }

})( jQuery );
