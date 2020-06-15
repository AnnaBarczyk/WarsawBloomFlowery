"use strict";
(function ($) {
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
  });

  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // You are in mobile browser
    $('.fade-animate').addClass("hide-el").viewportChecker({
      classToAdd: 'show-el animated fadeInUp',
      offset: 80
    });
  }

  // Closes the Responsive Menu on Menu Item Click
  $('.navbar-collapse ul li a').on('click', function () {
    $('.navbar-toggle:visible').trigger("click");
  });

  // Offset for Main Navigation
  $('#mainNav').affix({
    offset: {
      top: 100
    }
  });

  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  $grid.imagesLoaded().progress(function () {
    $grid.masonry();
  });

  var toolbar = document.querySelector(".portfolio-nav");
  toolbar.addEventListener("click", function (e) {
    $('.portfolio-nav a.active').removeClass('active');
    $(e.target).addClass('active');
    var anchor = $(e.target).attr('data-name');
    if (!anchor) {
      return false;
    }
    runFunc(anchor);
    e.preventDefault();
    e.stopPropagation();
  });
  var toolbar = document.querySelector("header");
  toolbar.addEventListener("click", function (e) {
    var $anchor = $(e.target).attr('href');
    if (!$anchor) {
      return false;
    }
    $('html, body').stop().animate({
      scrollTop: ($($anchor).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
    event.stopPropagation();
  });

  $('.carousel').bcSwipe({threshold: 50});
  jQuery(window).scroll(function () {
    var offset = 250;
    var duration = 300;
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.back-to-top').fadeIn(duration);
    } else {
      jQuery('.back-to-top').fadeOut(duration);
    }
  });

  $("#subscribe-form input").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      console.log('inside error');
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      console.log('inside success');
      event.preventDefault(); // prevent default submit behaviour
      var email = $("input#email").val();
      $.ajax({
        url: "../mail/subscribe.php",
        type: "POST",
        data: {
          email: email
        },
        cache: false,
        success: function () {
          // Success message
          $('#subscribe2-success').html("<div class='alert alert-success'>");
          $('#subscribe2-success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#subscribe2-success > .alert-success')
          .append("<strong>Your message has been sent. </strong>");
          $('#subscribe2-success > .alert-success')
          .append('</div>');

          //clear all fields
          $('#subscribe-form').trigger("reset");
        },
        error: function () {
          // Fail message
          $('#subscribe2-success').html("<div class='alert alert-danger'>");
          $('#subscribe2-success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#subscribe2-success > .alert-danger').append("<strong>Sorry, it seems that my mail server is not responding. Please try again later!");
          $('#subscribe2-success > .alert-danger').append('</div>');
          //clear all fields
          $('#subscribe-form').trigger("reset");
        }
      });
    },
    filter: function () {
      return $(this).is(":visible");
    }
  });

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function ($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $.ajax({
        url: "../mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          email: email,
          message: message
        },
        cache: false,
        success: function () {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#success > .alert-success')
          .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
          .append('</div>');

          //clear all fields
          $('#contactForm').trigger("reset");
        },
        error: function () {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
          .append("</button>");
          $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        }
      });
    },
    filter: function () {
      return $(this).is(":visible");
    }
  });

})(jQuery); // End of use strict

function runFunc(type) {
  switch (type) {
    case 'all':
    $('.item1').show();
    $('.item2').show();
    $('.item3').show();
    $('.item4').show();
    $('.item5').show();
    $('.item6').show();
    break;
    case 'first':
    $('.item1').hide();
    $('.item2').hide();
    $('.item3').hide();
    $('.item6').hide();
    $('.item4').show();
    $('.item5').show();
    break;
    case 'second':
    $('.item4').hide();
    $('.item5').hide();
    $('.item6').hide();
    $('.item1').show();
    $('.item2').show();
    $('.item3').show();
    break;
    case 'third':
    $('.item2').hide();
    $('.item3').hide();
    $('.item1').show();
    $('.item4').show();
    $('.item5').show();
    $('.item6').show();
    break;
  }
  $('.grid').masonry();
}