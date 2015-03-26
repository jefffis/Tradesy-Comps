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

  var featureHTML = '<span class="tag featured">Featured</span>';

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
        $('#'+id).append(featureHTML);
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
        $('#'+id+' .featured').remove();
        if(featured_num < 1){
          featured.find('.empty-set').fadeIn().removeClass('hide');
        }
      }, 750);

  });

  $('.ctls').on('click', function() {
    if($(this).parent().hasClass('show')){
      // $(this).text('Manage');
      $(this).parent().removeClass('show');
    }else{
      // $('.ctls').text('Manage');
      $('.product').removeClass('show');
      // $(this).text('Close');
      $(this).parent().addClass('show');
    }
  });

  $(document).on('click', function(e) {
    // if(!$(e.target).closest('.product').length){
    //   $('.ctls').text('Manage');
    //   $('.product').removeClass('showing');
    // }
    if(!$(e.target).closest('.ctls').length){
      $('.product').removeClass('show');
    }
    if(!$(e.target).closest('.has-drop').length){
      $('.has-drop').removeClass('showing');
    }
    if((!$(e.target).closest('.search').length) && (!$(e.target).closest('.inline').length)){
      if($(window).width() <= 500){
        $('.inline').hide();
        $('.search').removeClass('a');
      }
    }
    if((!$(e.target).closest('.filters').length) && (!$(e.target).closest('#filter-list').length)){
      $('#filter-list').addClass('hide');
      $('.filters').removeClass('a').text('Filter');
    }
  });

  hasDrops = $('.has-drop'),
    hasDropsOpen = hasDrops.find('span:first'),
    hasDropLinks = hasDrops.find('a'),
    hasDropsClose = hasDrops.find('em');

  hasDropsOpen.on('click', function() {
    // $('.has-drop').removeClass('showing');
    // $('#filterssss').removeClass('a').text('Filter');
    // $('#filter-list').addClass('hide');
    if(!!$(this).parent().hasClass('showing')){
      $(this).parent().removeClass('showing');
    }else{
      $(this).parent().addClass('showing');
    }
  });

  if(window.location.hash && !!$('#closet-header-hero-toggle').length){
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
      $(this).addClass('a');
      $('html,body').animate({
        scrollTop: $('#first-filter').offset().top - 20
      }, 500);
    }else{
      $('#filter-list').addClass('hide');
      $(this).removeClass('a');
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
        $('#filterssss').text('Filter').removeClass('a');
      }
      $('#loading').remove();
      if($(window).width() <= 900){
        $('html,body').animate({
          scrollTop: $('#products').offset().top - 50
        }, 500);
      }else if($(window).scrollTop() < ($('#filter-list').offset().top - 20)){
        $('html,body').animate({
          scrollTop: $('#filter-list').offset().top - 50
        }, 500);
      }
      $('#products').prepend(loading);
      setTimeout(function() {
        unLoading();
      }, 1000);
  }

  function unLoading() {
    $('#loading').remove();
    // $('#first-filter .tag.add:first').fadeOut();
    // setTimeout(function() {
    //   $('#first-filter .tag.add:first').remove();
    // }, 250);
  }

  function showFilters() {
    $('#filter-list').removeClass('hide');
    $('#filterssss').addClass('a');
  }

  function showAllFilters(e) {
    // e.clone().removeClass('hide').text('Loading...');
    if($(window).width() > 900){
      setTimeout(function() {
        $('#first-filter .hide').each(function(i) {
          var that = this;
          setTimeout(function() {
            $(that).fadeIn().addClass('show');
          }, 5 * i);
        });
      }, 750);
      setTimeout(function() {
        e.addClass('all').text('');
      }, 1500);
    }else{
      setTimeout(function() {
        $('#first-filter .hide').addClass('show');
      }, 750);
      setTimeout(function() {
        e.addClass('all').text('');
      }, 1500);
    }
  }

  function unShowAllFilters(e) {
    $('#first-filter .hide.show').removeClass('show');
    if($(window).scrollTop() > ($('#filter-list').offset().top)){
      $('html,body').animate({
        scrollTop: $('#filter-list').offset().top - 50
      }, 500);
    }
    e.text('Show 132 more');
  }

  // function clickOff(e) {
  //   $(e).append('<input type="radio" id="clickable" />');
  //   $('#clickable').click().blur();
  // }

  if($(window).width() > 900){
    showFilters();
  }

  $('#filter-cls').on('click', function() {
    $('#filter-list').addClass('hide');
    $('#filterssss').text('Filter').removeClass('a');
    $('html,body').animate({
      scrollTop: $('#products').offset().top - 30
    }, 500);
  });

  $('.filter-list .tag').on('click', function() {
    if($(this).hasClass('spn') || $(this).hasClass('more')){
      return;
    }
   if($(this).hasClass('atv')){
      $(this).removeClass('atv');
    }else{
      $(this).addClass('atv');
      // clickOff('body');
    }
    if($(window).width() > 900){
      loading();
    }
  });

  $('.filter-list .more').on('click', function() {
    if($(this).hasClass('all')){
      $(this).removeClass('all hide show');
      unShowAllFilters($(this));
    }else{
      $(this).text('Loading...');
      showAllFilters($(this));
    }
  });

  $('#searching').on('click', function() {
    if($(this).hasClass('a')){
      $(this).removeClass('a');
      // $('#closet-search-wrap').hide();
      $('.inline').hide();
    }else{
      $(this).addClass('a');
      $('.inline').show().find('input[type=search]').focus();
      // $('#closet-search-wrap').show();
      // $('#closet-search').focus();
    }
  });

});