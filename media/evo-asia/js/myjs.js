/*
=================== 
1. Structuring with bootstrap classes
2. Global Changes
3. Job Board Design
4. Plugin calls
5. Supporting function
6. Click Methods & related function calls
7. Rss Feed
8. System pages changes
 8.1. News page changes
*/

!(function($) {
    // RSS feed publish date format
    function formatDate( pubDate )
    {
        var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //var dateObj = new Date(Date.parse(pubDate));
        var dateObj = pubDate.split('/'),
        mnth = monthList[ parseInt(dateObj[1])-1],
        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span> ",
        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span> ",
        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2] + "</span> "; 
        return myDay + '<br>' + myMonth;    
    }
    //date format in news page

        function formatDate2(pubDate) {
        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        //var dateObj = new Date(Date.parse(pubDate));
        var dateObj = pubDate.split('/'),
            mnth = monthList[parseInt(dateObj[1]) - 1];
        return mnth  + dateObj[0] +", "  + dateObj[2].substr(0, 4);
    };

    //job template
    /*var mrgLeft = $(".omage-job-full-header").offset().left;
        $(".omage-job-full-header").css("margin-left", "-"+ mrgLeft + "px");
        $(".omage-job-full-header").css("width", $(window).width());
        $(window).resize(function(){
            $(".omage-job-full-header").css("margin-left", "-"+ $(".omega-jobheader").offset().left + "px");
            $(".omage-job-full-header").width($(window).width());
        });*/
        // $(document).ready(FullWidthHeader);
        // $(window).on('resize',FullWidthHeader);

        // function FullWidthHeader() {
        //     var $MyEle = $('.omage-job-full-header');
        //     if ($MyEle.length > 0 ) {
        //         $(".omage-job-full-header").css("margin-left", "-"+ $(".omega-jobheader").offset().left + "px");
        //         $(".omage-job-full-header").css("width", $(window).width());
        //     }
        // }       

    // jquery
    $(function() {

        // 1. Structuring with bootstrap classes
        // ========================================
        // Section > Div.container
        $('#dynamic-container, #content-container, #job-dynamic-container').addClass('container');

        // Content column
        if ( $.trim($('#dynamic-side-left-container, #side-left').html()).length ) {
            $('#dynamic-content, #content-container #content').addClass('col-sm-8 col-md-9');
            $('#dynamic-side-left-container, #side-left').addClass('col-sm-4 col-md-3 hidden-xs');
        } else {
            $('#dynamic-content, #content-container #content').addClass('col-xs-12');
            $('#dynamic-side-left-container, #side-left').addClass("hidden");
        }
        $('#job-dynamic-container #content').addClass('col-xs-12');

        // form elements style
        $('input:not([type=checkbox]):not([type=radio]):not([type=submit]):not([type=reset]):not([type=file]):not([type=image]):not([type=date]), select, textarea').addClass('form-control');
        $('input[type=text]').addClass('form-control');
        $('input[type=submit]').addClass('btn btn-primary');
        $('.mini-new-buttons').addClass('btn btn-primary');
        $('input[type=reset]').addClass('btn btn-default');

        // Responsive table
        $('.dynamic-content-holder table, .content-holder table').addClass('table table-bordered').wrap('<div class="table-responsive"></div>');

        // Convert top menu to Boostrap Responsive menu
        $('.navbar .navbar-collapse > ul').addClass('nav navbar-nav');
        $('.navbar .navbar-collapse > ul > li').has('ul').addClass('dropdown');
        $('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
        $('.navbar .navbar-collapse > ul > li.dropdown').append('<a id="child-menu"></a>');
        $('.navbar .navbar-collapse > ul > li.dropdown > a#child-menu').append('<b class="caret"></b>').attr('data-toggle', 'dropdown').addClass('dropdown-toggle');
        $('.navbar .navbar-collapse > ul > li > ul').addClass('dropdown-menu');

        // add placeholder for search widget text field
        $('#keywords1').attr('placeholder', 'Keywords search');

        // 2. Global Changes
        // ========================================

        // Adding a aria-label for accessabilty (Temp fix ONLY)
        $('#keywords1').attr('aria-label', 'Keyword search box');
        $('#professionID1').attr('aria-label', 'Professions');
        $('#locationID1').attr('aria-label', 'Locations');


        $('link[href="/media/COMMON/newdash/lib/bootstrap.min.css"]').remove();

        var currentPage = window.location.pathname.toLowerCase();

        // remove empty li's on the system pages. 
        $("#side-left li:empty").remove();

        // remove empty left side bar
        if ($('#prefix_left-navigation').children().length == 0) {
            $('#prefix_left-navigation').remove();
        }
        if ($('#side-left').children().length == 0) {
            $('#side-left').remove();
        }

        // add active class to links.
        $("li a[href='" + window.location.pathname.toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $("li li.active").parent().parent().addClass("active")

        // add last-child class to navigation 
        $("#prefix_navigation > ul > li:last").addClass("last-child");

        // add btn style
        $(".backtoresults a").addClass("btn btn-default");
        $(".apply-now-link a").addClass("btn btn-primary");
        $(".button a").addClass("btn btn-default");

        //.left-hidden show
        if ((document.URL.indexOf("/advancedsearch.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/advancedsearch.aspx?") >= 0)) {
            $(".left-hidden").css("display", "none");
        }
        if ((document.URL.indexOf("/member/createjobalert.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }
        if ((document.URL.indexOf("/member/login.aspx") >= 0)) {
            $(".left-hidden").css("display", "block");
        }

        // Contact - Google map
        $("#footer").prepend($("#contact-map"));


        // generate select navigation from sidebar Dynamic menu
        $("#dynamic-content").convertNavigation({
            title: "Related Pages",
            links: "#site-topnav .navbar-nav li.active a:not([data-toggle=dropdown])"
        });

        // generate actions button on Job Listing page
        $(".job-navbtns").convertButtons({
            buttonTitle: "Actions&hellip;",
            title: "Please choose&hellip;",
            links: ".job-navbtns a"
        });

        // generate filters button on Job Listing page
        $(".job-navbtns").convertFilters({
            buttonTitle: "Filters&hellip;",
            filteredTitle: "Applied Filters",
            title: "Please choose&hellip;",
            filtered: ".search-query p",
            list: "ul#side-drop-menu",
            excludeFromList: "#AdvancedSearchFilter_PnlCompany"
        });

        /* System Page Forms */
        if (currentPage == "/member/createjobalert.aspx") {
            setTimeout('__doPostBack(\'ctl00$ContentPlaceHolder1$ucJobAlert1$ddlProfession\',\'\')', 0);
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(function() {
                $('.alternate > li > select, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryLowerBand, #ctl00_ContentPlaceHolder1_ucJobAlert1_txtSalaryUpperBand').addClass('form-control');
                $('#ctl00_ContentPlaceHolder1_ucJobAlert1_ddlProfession, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlRole, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlLocation, #ctl00_ContentPlaceHolder1_ucJobAlert1_lstBoxArea, #ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary').addClass('form-control');
            });
        }
        $(document).ajaxComplete(function() {
            $('#divRoleID1 > select, #divAreaDropDown1 > div > select').addClass('form-control');
            $('#divRoleID > select, #divAreaDropDown > div > select').addClass('form-control');
        });
        $('#salaryID').change(function() {
            $(document).ajaxComplete(function() {
                $('#divSalaryFrom > input').addClass('form-control');
                $('#divSalaryTo > input').addClass('form-control');
            });
        });

        
        function SalaryFromChange1() {
            $(document).ajaxComplete(function() {
                $('#divSalaryTo1 > input').addClass('form-control');
                $('#divSalaryFrom1 > input').addClass('form-control');
            });
        }

        if (currentPage == "/member/register.aspx") {
            $(".uniForm").addClass("border-container");
        }
        if (currentPage == "/member/createjobalert.aspx") {
            $(".uniForm").addClass("border-container");
        }

    });

        //add animation
         $.fn.isOnScreen = function () {
                    var win = $(window);
                    var viewport = {
                        top: win.scrollTop(),
                        left: win.scrollLeft()
                    };
                    viewport.right = viewport.left + win.width();
                    viewport.bottom = viewport.top + win.height();

                    var bounds = this.offset();
                    bounds.right = bounds.left + this.outerWidth();
                    bounds.bottom = bounds.top + this.outerHeight();

                    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
                };
                function addAnimation() {
                    $(".animated").each(function () {
                        var this_ = $(this);
                        if (this_.isOnScreen() && !this_.hasClass(this_.data("class"))) {
                            this_.addClass(this_.data("class"));
                            this_.addClass('active')
                        }
                    })
                }

    // Resize action
    /*$(window).on('resize', function() {

    	var wi = $(this).width();

    	// Mobile & Tablet
    	if ( wi <= 992 ) {
    		//$('#dynamic-side-left-container').before($('#dynamic-content'));
    		//$('#side-left').before($('#content'));    		
    		$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');
    	}
    	//  Desktop
    	else {
    		//$('#dynamic-side-left-container').after($('#dynamic-content'));
    		//$('#side-left').after($('#content'));
    		$('.navbar .navbar-collapse > ul > li.dropdown > a').addClass('disabled');
    	} 

    });*/

    $(document).ready(function() {

        //job page
        $(".omage-job-full-header").insertAfter('#header');

        //menu toggle

        $(".mynav").css('display','none');
        $(".mob-toggle").click(function(){
            $(".mynav").slideToggle();
            $(".mobile-header").toggleClass("mobile-header1");
        });

        //placeholder general

        $("form :input").each(function (index, elem) {
            var eId = $(elem).attr("id");
            var label = null;
            if (eId && (label = $(elem).parents("form").find("label[for=" + eId + "]")).length == 1) {
                $(elem).attr("placeholder", $(label).clone().children().remove().end().text().replace(/  +/g, ''));
                //$(label).remove();
            }
        });

        // placeholder for forget pswd
         $('.form-all input[type=\'text\'], .form-all input[type=\'email\'], .form-all input[type=\'password\']').each(function(index, elem) {
                var eId = $(elem).attr('id');
                var span = $(elem).closest('.form-line').children('span')
                if (span.length) {
                    $(elem).attr('placeholder', span.text().replace(/  +/g, ''));
                }
            });

        // job page placeholder
                    $('.form-all input[type=\'text\'], .form-all input[type=\'email\'], .form-all input[type=\'password\']').each(function(index, elem) {
                        var eId = $(elem).attr('id');
                        var span = $(elem).closest('#ef-youremail-field').children('span')
                        if (span.length) {
                            $(elem).attr('placeholder', span.text().replace(/  +/g, ''));
                        }
                    });

         $('.form-all input[type=\'text\'], .form-all input[type=\'email\'], .form-all input[type=\'password\']').each(function(index, elem) {
                        var eId = $(elem).attr('id');
                        var span = $(elem).closest('.form-line').children('span')
                        if (span.length) {
                            $(elem).attr('placeholder', span.text().replace(/  +/g, ''));
                        }
                    });

        //News placeholder
        $("#ctl00_ContentPlaceHolder1_tbKeywords").attr("placeholder", "Keywords");

        //add place holder in advance search inner page
        $('#txtSalaryLowerBand').attr('placeholder', 'Minimum');
        $('#txtSalaryUpperBand').attr('placeholder', 'Maximum');

        //add place holder in advance search page
        $('#salarylowerband').attr('placeholder', 'Minimum');
        $('#salaryupperband').attr('placeholder', 'Maximum');

        //remove time from job
        var mydate = $('.mydate').text();
         var mydate2 = mydate.split(' ')[0];
         $('.mydate').text(mydate2);

         //insert breadcrumb in news page
         $('<div class="breadcrumbs">\
    <span><a class="home" href="/" title="Go to evo-asia.com.">Home</a> </span> <span> <em class="fa fa-angle-right"><span class="hidden">Right</span></em> </span> <span>News</span></div>').insertBefore('.jxt-news-filter-container');

         //add active class on Menu
        $("li a[href='" + (window.location.pathname+window.location.search).toLowerCase() + "']").parent().addClass("active");
        $("li.active li.active").parent().closest("li.active").removeClass("active");
        $("li li.active").parent().parent().addClass("active")
        //append service contact to footer
        $('.service-contact').prependTo('#footer');

        //change position of image in news
        $('.jxt-news-item-image:parent').each(function () {
            $(this).insertBefore($(this).prev('.jxt-news-item-title'));
        });

        //add class to body according to url
        var pageTitle = window.location.pathname.replace("/", "");
        if (pageTitle != "") {
            if (pageTitle.indexOf('/') > -1) {
                pageTitle = pageTitle.replace(/\//g, "-");
            }
            $("body").addClass(pageTitle);
        }

        //append canvas in employibilty page
        $('.mygraph').appendTo('.growth-chart');

        //change date format in news
        $(".jxt-news-item").each(function () {

         //date formatting
                    var dateObj = $(this).find('.jxt-news-item-date-published dd span');
                    var newDateObj = formatDate2(dateObj.text());
                    dateObj.text(newDateObj);
        })

        // add link to figure in news page
        $(".jxt-news-item").each(function () {
            $(this).find('.jxt-news-item-image').wrapInner('<a href="#" class="news-link"> </a>');
            $(this).find('.jxt-news-item-image a').attr('href', $(this).find('.jxt-news-item-title > a').attr('href'));
        });

        //insert date after title in inner news page
        if($('.jxt-single-item').length){
            $('.jxt-news-item-meta-data').insertAfter('.jxt-news-item-title');
            $(this).find('.jxt-news-item-author dt:first').text('Posted by');
            $(this).find('.jxt-news-item-category dt:first').text('Category:');
            $('.jxt-news-item-category').insertAfter('.jxt-news-item-author');
        }

        /*// Resize action
        var $window = $(window);
        	// Function to handle changes to style classes based on window width
        	function checkWidth() {
        	if ($window.width() < 992) {
        		$('.navbar .navbar-collapse > ul > li.dropdown > a').removeAttr('class');	
        		}
        }
        	// Execute on load
        	checkWidth();			
        	// Bind event listener
        	$(window).resize(checkWidth);*/

        // 4. Plugin calls
        // ========================================

        // Home services - carousel
        // $('.t-gallery').Gallerycarousel({ autoRotate: 4000, visible: 4, speed: 1200, easing: 'easeOutExpo', itemMinWidth: 250, itemMargin: 30 })

        addAnimation();


        //home-banner
        $('.home-banner').slick({
            dots: false,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            arrows:false,
            lazyLoad: 'ondemand',
            lazyLoadBuffer: 0,
            fade: true,
            cssEase: 'linear'
        });

        //about-banner
        $('.about-banner').slick({
            dots: true,
            autoplay: true,
            speed:300,
            autoplaySpeed: 5000,
            infinite: true,
            arrows:false,
            slidesToShow: 1,
            slidesToScroll: 1
        });

        // Equal Height	
        $.fn.eqHeights = function(options) {

            var defaults = { child: false };
            var options = $.extend(defaults, options);
            var el = $(this);
            if (el.length > 0 && !el.data('eqHeights')) {
                $(window).bind('resize.eqHeights', function() {
                    el.eqHeights();
                });
                el.data('eqHeights', true);
            }
            if (options.child && options.child.length > 0) {
                var elmtns = $(options.child, this);
            } else {
                var elmtns = $(this).children();
            }

            var prevTop = 0;
            var max_height = 0;
            var elements = [];
            elmtns.height('auto').each(function() {

                var thisTop = this.offsetTop;
                if (prevTop > 0 && prevTop != thisTop) {
                    $(elements).height(max_height);
                    max_height = $(this).height();
                    elements = [];
                }
                max_height = Math.max(max_height, $(this).height());
                prevTop = this.offsetTop;
                elements.push(this);
            });

            $(elements).height(max_height);
        };

        // Equal Height - Usage
        $('.service-holder').eqHeights();

        // 5. Supporting function
        // ========================================
        // if there is a hash, scroll down to it. Sticky header covers up top of content.
        if ($(window.location.hash).length) {
            $("html, body").animate({
                scrollTop: $(window.location.hash).offset().top - $(".navbar-wrapper").height() - 40
            }, 100);
        }

        // 6. Click Methods & related function calls
        // ========================================
        // contact page stop scrolling until clicked.
		$(".r27_map-overlay").click(function(){
			$(this).hide();
		});

        // 7. Rss Feed
        // ========================================
        //consulant feed : meet the team page
        if( $('#r17_team-member-pages').length ){
            $(".r17_team-member-page").each(function() {
                var dataURL = $(this).attr("data-url");
                $(this).includeFeed({
                    baseSettings: {
                        rssURL: [dataURL || "/ConsultantsRSS.aspx"],
                        limit: 200,
                        addNBSP: false,
                        repeatTag: "consultant"
                    },//end of base setting
                    templates: {
                        itemTemplate: '<div class="row"><div class="staff-holder"><div class="col-sm-4 text-center">'+
                            '<img alt="{{FirstName}} {{LastName}}" src="{{ImageURL}}">'+
                            '<ul class="list-inline" id="site-social">'+
                            '<li><a href="{{LinkedInURL}}" target="_blank"><i class="fa fa-linkedin"><!-- --></i></a></li>'+
                            '<li><a href="{{FacebookURL}}" target="_blank"><i class="fa fa-facebook"><!-- --></i></a></li>'+
                            '<li><a href="{{TwitterURL}}" target="_blank"><i class="fa fa-twitter"><!-- --></i></a></li>'+
                            '</ul>'+
                            '</div>'+
                            '<div class="col-sm-8">'+
                                    '<h3>{{FirstName}} {{LastName}} / <span>{{PositionTitle}}</span></h3><br>{{FullDescription}}'+
                            '</div>'+
                        '</div></div>'
                    },//end of templates
                    complete: function () {
                        
                    }// end of complete function
                }); // end of include feed
            }); // end of team list each

        }

        // Latest Jobs widget
        // $("#myJobsList ul").includeFeed({
        //     baseSettings: { rssURL: "/job/rss.aspx?search=1&addlocation=1", addNBSP: false, },
        //     elements: { title: 1, description: 1 },
        //     predicates: {
        //         pubDate: formatDate
        //     }, 
        //     complete: function() {
        //         if ($(this).children().length){ 
        //             $(this).children().each(function(){
        //                 $(this).find('.xmlLocation').insertBefore($(this).find('.rss-item-title'));
        //             });

        //             var desc = $(this).find('.rss-item-description').text();
        //             var descLen = $(this).find('.rss-item-description').text().length;
        //             if( descLen > 210 ){
        //                 desc = desc.substr(0,200) +'...';
        //             }
        //             $(this).find('.rss-item-description').text(desc);
        //         }
        //         if ($(this).children().length > 2) {
        //             $(this).simplyScroll({ frameRate: 60 });
        //         }
        //     }
        // });

        // Carrer-job
        $("#myJobsList tbody").each(function () {
            var dataURL = $(this).attr("data-url");
            console.log(dataURL);
            $(this).includeFeed({
                baseSettings: {
                     rssURL: [dataURL || "/job/rss.aspx?search=1&addlocation=1"]
                    , addNBSP: false
                },
            templates: {
                    itemTemplate: "<tr><td class='job-title'><a href='{{link}}' title='{{title}}'>{{title}}</a></td><td class='job-desc'>{{description}}</td><td class='job-location'></td><td class='job-dept'>{{category}}</td><td class='job-date'>{{pubDate}}</td></tr>"
                },
            predicates: {
                    pubDate: function (pubDate) {
                        var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        var dateObj = '';
                        var myDay, myMonth, myYear;
                        dateObj = pubDate.split('/');
                        mnth = monthList[parseInt(dateObj[1]) - 1];
                        myDay = "<span class='rss-item-pubDate-date'>" + dateObj[0] + "</span>";
                        myMonth = "<span class='rss-item-pubDate-month'>" + mnth + "</span>";
                        myYear = "<span class='rss-item-pubDate-full-year'>" + dateObj[2].substr(0, 4) + "</span> ";
                        return myMonth + " " + myDay + ", " +myYear;
                    }
                },
            complete: function() {
                if ($(this).children().length > 1) {
                    var item = $(this);
                            item.find('.job-location').append(item.find('.xmlLocation').html());
                            $("#myJobsList table").tablesorter({
                                sortList: [[3, 1]]
                            });
                };
            }
            });
        });




        // 8. System pages changes
        // ========================================
        if ($('#site-topnav .user-loggedIn').length) {
            $('a#HiddenMemLog').prop("href", "/member/default.aspx").text('My Dashboard');
        }

        // Custom Function
        CustomFunction();
    });// end of document ready

window.onload = function() {
    addAnimation();
};

window.resize = function() {
    addAnimation();
};
})(jQuery);

function CustomFunction(){
    //console.log('this is triggered before ' + pageurl);
    var pageurl = window.location.pathname.toLowerCase();
    if( pageurl =="/member/createjobalert.aspx" ){
        //basicProfile section
    $('#search-salary label[for="ctl00_ContentPlaceHolder1_ucJobAlert1_ddlSalary"]').text('Salary Type');
    }
}