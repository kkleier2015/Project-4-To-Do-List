/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0..
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('body').on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                 // item is an empty string
  $list = $('.list-group');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  var items = getFromLocal('memos');
  var index;
  loadList(items);


  // ADDING A NEW LIST ITEM
  $newItemForm.on('submit', function(e) {       // When a new item is submitted
    e.preventDefault();                         // Prevent form being submitted
    var text = $('input:text').val(); 
    items.push(text);
    $('input:text').val('');                    // Empty the text input
    
    loadList(items);
    storeToLocal('memos', items);
  });

  // MARK ITEM COMPLETE
  $(document).on('click', '.done', function () {
    if( $(this).parent().css('textDecoration') == 'line-through') {
      $(this).parent().css('textDecoration', 'none');
    } else {
    $(this).parent().css('textDecoration', 'line-through');
  }
  });


  // DELETE ITEM FROM LIST
  $('.list-group').delegate(".delete", "click", function(event){
    event.stopPropagation();
    index = $('.delete').index(this);
    $('.list-group-item').eq(index).remove();
    items.splice(index, 1);
    storeToLocal('memos', items);
    
  });

  // SHOW EDIT PANEL
  $('.list-group').delegate('.list-group-item', 'click', function(){
    index = $('.list-group-item').index(this);
    var content = items[index];
    console.log(content);
    $('#edit-input').val(content );
  });

  // SAVE CHANGES
  $('#edit-button').click(function(){
    items[index] = $('#edit-input').val();
    loadList(items);
    storeToLocal("memos", items);
  });

  // LOAD ITEM LIST
  function loadList(items){
    var deleteButton = 
      '<button type="button" class="delete btn btn-xs btn-danger">'
      +'<span class="glyphicon glyphicon-remove"></span></button>';
    var editButton = 
      '<button type="button" class="edit btn btn-xs btn-primary" data-toggle="modal" data-target="#editModal">'
      +'<span class="glyphicon glyphicon-edit"></span></button>';
    var controlButtons = 
      "<div class='btn-group pull-right'>" + editButton + deleteButton + "</div>";
    $('.list-group-item').remove();
    if(items.length > 0) {
      for(var i = 0; i < items.length; i++) {
        $('.list-group').append('<li class= "list-group-item">'
         + '<input type="checkbox" style="margin-right:10px" class="done" />' 
         + items[i] + '<span>'+ controlButtons +'</span></li>');
      }
    }
  };

  // STORE ITEM LIST
  function storeToLocal(key, items){
    localStorage[key] = JSON.stringify(items);
  }

  // RETREIVE ITEM LIST
  function getFromLocal(key){
    if(localStorage[key])
      return JSON.parse(localStorage[key]);
    else 
      return [];
  }

