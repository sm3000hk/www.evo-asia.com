
!(function () {
    $(function () {

        function doPostBack(e) {
            e.preventDefault();
            // postback here
        }

        // detects if there is a thumbnail. If possible this functionality 
        // should be done in the back end.
        $(".jxt-news-item").each(function () {
            if ($(this).find(".jxt-news-item-image").length) {
                $(this).addClass("jxt-has-image");
            }
        });

        // refreshes the summary div to show which filters have been added.
        function refreshFilterSummary() {
            $(".jxt-news-filter-summary").each(function () {
                var myActiveOptions = $(this)
					.next(".jxt-news-filter-dropdown")
					.find("a.active");
                switch (myActiveOptions.length) {
                    case 0:
                        $(this).text($(this).data('default-summary'));
                        break;
                    case 1:
                        $(this).text(myActiveOptions.text());
                        break;
                    default:
                        // $(this).html("Multiple&hellip;");
                        var myTotalOptions = "";
                        myActiveOptions.each(function () {
                            myTotalOptions += ", " + $(this).text()
                        });
                        $(this).text(myTotalOptions.substring(2));
                        break;
                }
            });
        }

        refreshFilterSummary();

        $(".jxt-news-filter-summary").click(function () {
            // $(this).toggleClass("active");
            // $(this).next(".jxt-news-filter-dropdown").toggleClass("active");

            var ariaVal = $(this).next(".jxt-news-filter-dropdown").attr("aria-hidden");
            ariaVal = "false" == ariaVal ? false : true;
            $(this).attr("aria-expanded", ariaVal);
            $(this).next(".jxt-news-filter-dropdown").attr("aria-hidden", !ariaVal);
        });

        $(".jxt-news-filter-multiple a").click(function () {
            $(this).toggleClass("active");
            refreshFilterSummary();
        });
        $(".jxt-news-filter-single a").click(function () {
            $(this).parent().siblings().children("a").removeClass("active");
            $(this).addClass("active");
            refreshFilterSummary();
        });
       
    });
})();