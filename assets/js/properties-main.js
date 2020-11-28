$(document).ready(function () {

    //highlight buttons when clicked
	$('button').on('click', function() {
    $('button').removeClass('selected');
    $(this).addClass('selected');
    });

    //hide map view when page loads

    $("#map-view").addClass("hidden");

    //buttons to switch between map and list views

    $("#map-view-btn").on("click", function(){
        $("#map-view").removeClass("hidden");
        $("#list-view").addClass("hidden");
    });

    $("#list-view-btn").on("click", function(){
        $("#list-view").removeClass("hidden");
        $("#map-view").addClass("hidden");
    });
  
    //buttons to hide and show the correct properties on both views

    $("#2-bed-btn").on('click', function(){
    $(".2-bed-props").removeClass("hidden");
    $(".3-bed-props").addClass("hidden");
    $(".4-bed-props").addClass("hidden");
    $(".5-bed-props").addClass("hidden");
    $(".6-bed-props").addClass("hidden");
    $(".7-bed-props").addClass("hidden");
    });

    $("#3-bed-btn").on('click', function(){
    $(".3-bed-props").removeClass("hidden");
    $(".2-bed-props").addClass("hidden");
    $(".4-bed-props").addClass("hidden");
    $(".5-bed-props").addClass("hidden");
    $(".6-bed-props").addClass("hidden");
    $(".7-bed-props").addClass("hidden");
    });

    $("#4-bed-btn").on('click', function(){
    $(".4-bed-props").removeClass("hidden");
    $(".2-bed-props").addClass("hidden");
    $(".3-bed-props").addClass("hidden");
    $(".5-bed-props").addClass("hidden");
    $(".6-bed-props").addClass("hidden");
    $(".7-bed-props").addClass("hidden");
    });

    $("#5-bed-btn").on('click', function(){
    $(".5-bed-props").removeClass("hidden");
    $(".2-bed-props").addClass("hidden");
    $(".3-bed-props").addClass("hidden");
    $(".4-bed-props").addClass("hidden");
    $(".6-bed-props").addClass("hidden");
    $(".7-bed-props").addClass("hidden");
    });

    $("#6-bed-btn").on('click', function(){
    $(".6-bed-props").removeClass("hidden");
    $(".2-bed-props").addClass("hidden");
    $(".3-bed-props").addClass("hidden");
    $(".4-bed-props").addClass("hidden");
    $(".5-bed-props").addClass("hidden");
    $(".7-bed-props").addClass("hidden");
    });

    $("#7-bed-btn").on('click', function(){
    $(".7-bed-props").removeClass("hidden");
    $(".2-bed-props").addClass("hidden");
    $(".3-bed-props").addClass("hidden");
    $(".4-bed-props").addClass("hidden");
    $(".5-bed-props").addClass("hidden");
    $(".6-bed-props").addClass("hidden");
    });
    
});
//scroll function repeated for sticky navbar
//back to top function:

mybutton = document.getElementById("topBtn");

// When the user scrolls down 300px from the top of the document, show the button. also includes sticky navbar function
window.onscroll = function() {
    scrollFunction();
    stickyFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//sticky nav function

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function stickyFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}