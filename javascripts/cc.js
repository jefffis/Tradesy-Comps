$(function(){
  $('#admin-toggle').on('click', function() {
      if($(this).hasClass('admin')) {
        $(this).removeClass('admin').text('Show Seller');
        $('#profile-actions').removeClass('hide');
        $('#profile-actions-seller').addClass('hide');
        $('#closet-header').removeClass('admin');
        $('#seller-nav').addClass('hide');
      }else{
        $(this).addClass('admin').text('Show Buyer');
        $('#profile-actions').addClass('hide');
        $('#profile-actions-seller').removeClass('hide');
        $('#closet-header').addClass('admin');
        $('#seller-nav').removeClass('hide');
      }
    });

  $('#hero-toggle').on('click', function() {
    var src = $('#user').attr('src'),
      defaultSrc = 'images/default-user.png';
      if($(this).hasClass('admin')){
        $(this).removeClass('admin');
        $('#closet-header').removeClass('default');
        $('#user').attr('src',src);
      }else{
        $(this).addClass('admin');
        $('#closet-header').addClass('default');
        $('#user').attr('src',defaultSrc);
      }
    });

  $('#toggle-chg').on('click', function() {
      if($(this).text()=='Close'){
        $(this).text('Change Profile Images');
        $('.chg').removeClass('s');
        // $('#editProfile').addClass('hide');
        $('.closet-wrapper').removeClass('out');
        // $('body').removeClass('out');
      }else{
        $(this).text('Close');
        setTimeout(function(){
          $('.chg').addClass('s');
          $('.closet-wrapper').addClass('out');
        }, 125);
        // $('#editProfile').removeClass('hide');
        // $('body').addClass('out');
        // $('html,body').animate({
        //   scrollTop: $('#editProfile').offset().top - 100
        // }, 500);
      }
      return false;
    });

  $('.chg').on('click', function() {
    $('#modal-wrap').removeClass('hide');
  });

  $('#cls').on('click', function() {
    $('#modal-wrap').addClass('hide');
  });

  // var brands_hidden = $('#brands .hide'),
  //  brands_hidden_num = brands_hidden.length,
  //  b = 0;

  // function showBrands() {
  //  for(b; b < brands_hidden_num; b++) {
  //    setTimeout(function() {
  //      console.log($(brands_hidden[b]));
  //      $(brands_hidden[b]).addClass('show');
  //    }, 150);
  //    // $(brands_hidden[b]).addClass('show');
  //  }
  // }

  $('#brand-toggle').on('click', function() {
    if($(this).hasClass('show')){
      $(this).removeClass('show').text('Show all');
      $('#brands .hide').removeClass('show');
    }else{
      $(this).addClass('show').text('Hide all');
      $('#brands .hide').each(function(i) {
        var that = this;
        setTimeout(function() {
          $(that).fadeIn().addClass('show');
        }, 15 * i);
        // $(this).addClass('show');
      });
      // showBrands();
    }
    return false;
  });

  $('body').on('click', '.feature-this', function() {
    var featured = $('#featured'),
        featured_num = featured.find('.product').length,
        id = $(this).data('id'),
        content_all = $('#'+id)[0].outerHTML,
        content = $('#'+id).html(),
        empty_st = '<div class="cover">Adding to featured&hellip;</div>';

      $('#'+id).append(empty_st);
      setTimeout(function() {
        $('#'+id).find('.cover').remove();
        $('#'+id).find('.feature-this').removeClass('feature-this').addClass('unfeature-this').text('Unfeature');
        featured_num++;
      }, 750);

      setTimeout(function() {
        if(featured_num < 4){
          featured.find('.empty-set').fadeOut().addClass('hide');
          featured.append(content_all);
        }
      }, 1000);

  });

  $('body').on('click', '.unfeature-this', function() {
    var featured = $('#featured'),
        featured_num = featured.find('.product').length,
        id = $(this).data('id'),
        content_all = $('#'+id)[0].outerHTML,
        content = $('#'+id).html(),
        empty_st = '<div class="cover">Removing from featured&hellip;</div>';

      $('#'+id).append(empty_st);
      setTimeout(function() {
        $('#'+id).find('.cover').remove();
        $('#'+id).find('.unfeature-this').removeClass('unfeature-this').addClass('feature-this').text('Feature');
        featured.find('#'+id).remove();
        featured_num--;
        if(featured_num < 1){
          featured.find('.empty-set').fadeIn().removeClass('hide');
        }
      }, 750);

  });

  $('.ctls').on('click', function() {
    if($(this).parent().hasClass('showing')){
      $(this).parent().removeClass('showing');
    }else{
      $('.product').removeClass('showing');
      $(this).parent().addClass('showing');
    }
  });

  if(window.location.hash){
    $('.product .analytics').hide();
    $('.product .ctls').hide();
    $('.brand.hide:first').removeClass('hide');
    $('.empty').hide();
    $('.chg').hide();
    $('#closet-header').removeClass('admin');
    $('#profile-actions-seller').hide();
    $('#profile-actions').removeClass('hide');
    $('#seller-nav').addClass('hide');
  }

});