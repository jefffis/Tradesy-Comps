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

  $('#brand-cls').on('click', function() {
    $('#brand-toggle').removeClass('show').text('Show all');
    $('#brands .hide').removeClass('show');
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

  // $('.ctls').on('click', function() {
  //   if($(this).parent().hasClass('showing')){
  //     $(this).text('Manage');
  //     $(this).parent().removeClass('showing');
  //   }else{
  //     $('.ctls').text('Manage');
  //     $('.product').removeClass('showing');
  //     $(this).text('Close');
  //     $(this).parent().addClass('showing');
  //   }
  // });

  $(document).on('click', function(e) {
    // if(!$(e.target).closest('.product').length){
    //   $('.ctls').text('Manage');
    //   $('.product').removeClass('showing');
    // }
    if(!$(e.target).closest('.has-drop').length){
      $('.has-drop').removeClass('showing');
    }
  });

  hasDrops = $('.has-drop'),
    hasDropsOpen = hasDrops.find('span:first'),
    hasDropLinks = hasDrops.find('a'),
    hasDropsClose = hasDrops.find('em');

  hasDropsOpen.on('click', function() {
    $('.has-drop').removeClass('showing');
    if(!!$(this).parent().hasClass('showing')){
      $(this).parent().removeClass('showing');
    }else{
      $(this).parent().addClass('showing');
    }
  });

  if(window.location.hash){
    $('.product').removeClass('s');
    $('.product .analytics').remove();
    $('.product .ctls').remove();
    $('.sale').removeClass('hide');
    // $('.brand.hide:first').removeClass('hide');
    $('.empty').remove();
    $('.chg').remove();
    $('#closet-header').removeClass('admin');
    $('#profile-actions-seller').remove();
    $('#profile-actions').removeClass('hide');
    $('#seller-nav').remove();
    // $('#closet-search-wrap form').removeClass('hide');
  }

  $('#filterssss').on('click', function() {
    if($('#filter-list').hasClass('hide')){
      $('#filter-list').removeClass('hide');
      $(this).text('Hide filters').addClass('a');
      $('html,body').animate({
        scrollTop: $('#filter-list').offset().top - 50
      }, 500);
    }else{
      $('#filter-list').addClass('hide');
      $(this).text('Show filters').removeClass('a');
    }
  });

  $('#apply-filters').on('click', function() {
    loading();
  });

  function loading() {
    var height = $('#products').height(),
      loading = '<div class="loading" id="loading" style="height: '+height+'px;"><span></span></div>';
      if($(window).width() <= 900){
        $('#filter-list').addClass('hide');
        $('#filterssss').text('Show filters').removeClass('a');
      }
      $('#loading').remove();
      $('#products').prepend(loading);
      setTimeout(function() {
        unLoading();
      }, 1000);
  }

  function unLoading() {
    $('#loading').remove();
  }

  function showFilters() {
    $('#filter-list').removeClass('hide');
    $('#filterssss').text('Hide filters').addClass('a');
  }

  if($(window).width() > 900){
    showFilters();
  }

  $('#filter-cls').on('click', function() {
    $('#filter-list').addClass('hide');
    $('#filterssss').text('Show filters').removeClass('a');
  });

  $('.filter-list .tag').on('click', function() {
    if($(this).hasClass('spn')){
      return;
    }
   if($(this).hasClass('atv')){
      $(this).removeClass('atv');
    }else{
      $(this).addClass('atv');
    }
    if($(window).width() > 900){
      loading();
    }
  });

});