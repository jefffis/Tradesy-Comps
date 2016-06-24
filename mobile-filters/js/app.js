$(function() {
    var button = $('.toggle-filters'),
        filters = $('#filters'),
        tabs = $('span', '.tab'),
        toggle = $('#toggle'),
        apply = $('#apply'),
        toggleableDiv = $('h2', '.filter'),
        radios = $('input[type=radio]'),
        checkboxes = $('input[type=checkbox]'),
        sizing = $('#sizing'),
        sort = $('#sort'),
        sortActions = $('a', '#sort-actions'),
        ajaxOverlay = '<div id="ajax-overlay"></div>',
        resultNum = $('#result-num'),
        scrollPos = null,
        windowScrollPos = null,

        // sticky header for filter / sort
        filterSortDiv = $('#filter-sort'),
        filterSortDivTop = filterSortDiv.offset().top,
        win = $(window);
    
    win.scroll(function(e){
        var scrollTop = win.scrollTop();
        if(scrollTop > (filterSortDivTop + 100)){
            $('#content').css('padding-top', filterSortDiv.outerHeight());
            filterSortDiv.addClass('sticky');
        } else if (scrollTop <= filterSortDivTop) {
            $('#content').css('padding-top', 0);
            filterSortDiv.removeClass('sticky');
        }
    });

    if ( window.innerWidth > 500 ) {
        $('html').addClass('is-tablet');
        $('.department:first').hide();
        $('.department:last').show();
        sizing.show();
    }

    if ( window.location.hash ) {
        $('#department').text('Department');
        $('label.shoes', '#images').remove();
        $('label.dept', '#images').removeClass('hidden');

        if (window.location.hash.indexOf('removed') > -1) {
            // window.location.reload(true);
            var filterRemoved = window.location.hash.replace('#removed=', '');
            $('[data-filter=' + filterRemoved + ']').remove();
        }
    }

    button.on('click', function() {

        if ( !filters.hasClass('show') ) {
            windowScrollPos = $(window).scrollTop();
            filters.addClass('show');
            enableStickyButton($('#apply'), filters, true);
        } else {
            window.scroll(0, windowScrollPos);
            filters.removeClass('show');
            enableStickyButton($('#apply'), filters, false);
            // resetFilterUI();
        }

    });

    // $('button', '.inline').on('click', function() {
    //  $(this).prop('disabled', true);
    // });

    $('input', '.inline').on('keyup', function() {
        if ( $(this).val() !== '' ) {
            $(this).parent().parent().parent().find('.hidden').show();
            $(this).parent().parent().parent().find('.vis').hide();
        } else {
            $(this).parent().parent().parent().find('.hidden').hide();
            $(this).parent().parent().parent().find('.vis').show();
        }
    });

    $('.light-btn').on('click', function() {
        var nextTen = $(this).parents('[data-inputs]').find('label.hidden'),
            i = 0,
            last = false,
            $this = $(this);

        if ( nextTen.length <= 10 ) {
            last = true;
        }

        $(this).prop('disabled', true);

        setTimeout(function() {
            enableButton($this);
            nextTen.each(function(i) {

                if ( i > 9 ) {
                    return;
                }

                if ( last ) {
                    $this.remove();
                }

                $(this).removeClass('hidden');
                i++;
            });
        }, 750);
    });

    sort.on('click', function() {
        $('#sort-actions').toggleClass('show');
    });

    sortActions.on('click', function() {
        location.reload(true);
    });

    $('#close-sort').on('click', function() {
        $('#sort-actions').removeClass('show');
    });

    toggle.on('click', function() {
        var ctx = $(this).hasClass('active') ? 'All items' : 'Sale items only';

        ajaxUpdateFilters(ajaxOverlay);
        toggle.toggleClass('active');
        setDataAttrNonVal(toggle.prev('h2'), ctx);
    });

    tabs.on('click', function() {

        var thisTabs = $(this).siblings('span');

        if ( $(this).hasClass('disabled') ) {
            return;
        }

        // ajaxUpdateFilters(ajaxOverlay);
        thisTabs.removeClass('active');
        $(this).addClass('active');
    });

    radios.on('click', function() {
        var checked = $(this).prop('checked') === true ? true : false;

        // console.log(checked);

        ajaxUpdateFilters(ajaxOverlay);
        setDataAttr($(this).parents('[data-filter]').find('h2'), $(this), checked);
    });

    checkboxes.on('click', function() {
        var checked = $(this).prop('checked') === true ? true : false;

        // console.log(checked);

        ajaxUpdateFilters(ajaxOverlay);
        
        if ($(this).data('small') !== undefined) {
            setToggleDataAttr($(this));
            return;
        }

        setDataAttr($(this).parents('[data-filter]').find('h2'), $(this).parent().find('input'), checked);
    });

    toggleableDiv.on('click', function() {
        if ( $(this).parent().data('toggleable') !== undefined ) {

            if ($(this).parent().data('not') !== undefined) {
                return;
            }

            if ( !$(this).hasClass('open') ) {
                $('html, body').animate({
                    scrollTop : $(this).offset().top
                }, 500);
            }

            $(this).toggleClass('open');
            $(this).next('div').toggle();
        }
    });

    $('input', '.radios-as-checks').each(function() {
        $(this).attr('type', 'checkbox'); // change this with JS so the native functionality still works
    });

    $('input', '.radios-as-checks').on('click', function() {
        var relatedInputs = $(this).parents('.radios-as-checks').find('input'),
            thisInputChecked = $(this).prop('checked') ? true : false;

        relatedInputs.prop('checked', false);
        $(this).prop('checked', thisInputChecked);
    });

    $('input', '.color').on('click', function() {
        $(this).parents('label').toggleClass('checked');
    });

    $('input', '.images').on('click', function() {
        var radio = $(this).attr('type') === 'radio' ? true : false;

        if ( radio ) {
            $(this).parents('.images').find('label').removeClass('checked');
        }

        $(this).parents('label').toggleClass('checked');
    });

    // $('input', '.collections').on('click', function() {
    //  $(this).parents('div').find('label').removeClass('checked');
    //  $(this).parents('label').addClass('checked');
    // });

    $('input', '.size').on('click', function() {
        var radio = $(this).attr('type') === 'radio' ? true : false;

        if ( radio ) {
            $(this).parents('.size').find('label').removeClass('checked');
        }

        $(this).parents('label').toggleClass('checked');
    });

    apply.on('click', function(e) {

        // console.log($(e.target).data('submit'));

        if ( $(e.target).data('submit') === undefined ) {
            reset($(e.target), ajaxOverlay);
            return;
        }

        fuaxSubmit($(this), filters, false);
    });

    $('button', '#applied-filters').on('click', function() {
        var filter = $(this).data('filter');
        window.location.href = window.location.pathname + '#removed=' + filter;
    });

    // $('#size-card').on('click', function() {
    //  $('html, body').animate({
    //      scrollTop : $('html, body').offset().top
    //  }, 125);
    //  setTimeout(function() {
    //      $('#size-wrapper').addClass('left');
    //      $('#non-size-filters').addClass('transitioning opaque');
    //      $('.intro:first', '#filters').addClass('left');
    //  }, 126);
    //  setTimeout(function() {
    //      $('#size-wrapper').css('position', 'absolute');
    //      $('#non-size-filters').hide();
    //  }, 376);
    // });

    $('[data-slideable]').on('click', function() {
        var target = $(this).data('slideable') !== undefined ? $(this).data('slideable') : false,
            targetHeight = target ? window.innerHeight : false;

        scrollPos = $(window).scrollTop();

        if (target) {
            setTimeout(function() {
                $(target).addClass('left').height(targetHeight - 67).css('overflow', 'hidden');
                $('#filter-wrapper').addClass('opaque');
            }, 126);
            setTimeout(function() {
                $(target).addClass('absolute');
                $('#filter-wrapper').hide();
                window.scroll(0, 0);
            }, 376);
            setTimeout(function() {
                $(target).removeAttr('style').addClass('padding-bottom');
            }, 750);
        }

        // $('html, body').animate({
        //  scrollTop : $('html, body').offset().top
        // }, 125);
        // setTimeout(function() {
        //  $('#size-wrapper').addClass('left');
        //  $('#non-size-filters').addClass('transitioning opaque');
        //  $('.intro:first', '#filters').addClass('left');
        // }, 126);
        // setTimeout(function() {
        //  $('#size-wrapper').css('position', 'absolute');
        //  $('#non-size-filters').hide();
        // }, 376);
    });

    $('button:first', '.slide-to').on('click', function() {

        var parent = $(this).parents('.slide-to'),
            parentId = parent.attr('id'),
            selectedText = parent.find('h2 em').text();

        
        $('[data-slideable=#' + parentId + ']').find('h2 em').text(selectedText);

        setTimeout(function() {
            // var sizes = $('[name=size]:checked'),
            //  sizePref = '';

            // if (sizes.length > 1) {
            //  var vals = '',
            //      valsCount = 0;

            //  sizes.each(function() {
            //      if ( valsCount > 1 ) {
            //          vals = vals.replace(' and ', ', ');
            //          if (valsCount > 2 ) {
            //              vals = vals.slice(0, -9);
            //          }
            //          vals += ', and ' + (valsCount - 1) + ' more';
            //      } else {
            //          vals += (valsCount === 0) ? $(this).val() : ' and ' + $(this).val();
            //      }
            //      valsCount++;
            //  });

            //  sizePref = vals;
            // } else {
            //  sizePref = sizes.val();
            // }

            // $('#non-size-filters').show();
            // $('h2', '#size-card').attr('data-selected', sizePref);
            parent.removeClass('left absolute padding-bottom');
            // $('html').removeAttr('style');
            $('#filter-wrapper').show().removeClass('opaque');
            window.scroll(0, scrollPos);
        }, 126);
        // setTimeout(function() {
        //  $('#non-size-filters').removeClass('opaque');
        // }, 376);
    });

    $('input:disabled').parents('label').addClass('disabled');

});

// function resetFilterUI() {
//     setTimeout(function() {
//         $('.slide-to').removeClass('left absolute padding-bottom');
//         $('#filter-wrapper').show().removeClass('opaque');
//     }, 500);
// }

function enableButton(el) {
    setTimeout(function() {
        el.prop('disabled', false);
    }, 500);
}

function reset(el, content) {
    el.prop('disabled', true);
    $('input').each(function() {
        $(this).prop('checked', false);
    });
    $('label.checked').each(function() {
        $(this).removeClass('checked');
    });
    $('input[data-default]').each(function() {
        $(this).prop('checked', true);
        $(this).parent().addClass('checked');
    });
    $('em', 'h2').each(function() {
        $(this).text('All');
    });
    ajaxUpdateFilters(content);
    setTimeout(function() {
        el.prop('disabled', false);
    }, 750);
}

function ajaxUpdateFilters(content) {
    var num = parseInt($('#result-num').text(), 10),
        numMinus = [11121, 5257, 8753][Math.floor(Math.random() * 3)],
        newNum = num - numMinus;

    // console.log(num, numMinus, newNum);

    setTimeout(function() {
        $('html').append(content);
    }, 125);
    setTimeout(function() {
        $('#ajax-overlay').remove();
        // $('#result-num').text(newNum);
    }, 701);
}

function setToggleDataAttr(el) {
    setTimeout(function() {
        var onOrOff = el.prop('checked') ? el.data('on') : el.data('off');
        el.parent().next('small').text(onOrOff);
    }, 751);
}

function setDataAttr(el, selected, addDisabled) {
    var val = selected.val(),
        checkbox = selected.attr('type') === 'checkbox' ? true : false,
        size = selected.data('sizing') !== undefined ? true : false,
        selectdReturn = selected.data('return') !== undefined ? true : false,
        disablable = $('#filters').find('input[data-disablable]'),
        em = el.find('span');

    // console.log(val, checkbox, size, selectdReturn, disablable, em, selected.data('dont'));

    if (selected.data('dont') !== undefined) {
        return;
    }

    setTimeout(function() {

        // // if (window.location.hash) {
        //  if (el.next('div').attr('id') === 'images') {
        //      if (addDisabled) {
        //          disablable.prop('disabled', true);
        //      } else {
        //          disablable.prop('disabled', false);
        //      }
        //  }
        // // }
        
        if ( checkbox ) {
            var multiSelected = selected.attr('name');

            // console.log(selected.length, $('input[name=' + multiSelected + ']:checked').length);

            if ( $('input[name=' + multiSelected + ']:checked').length > 1 ) {
                var vals = '',
                    valsCount = 0;

                console.log(valsCount);

                $('input[name=' + multiSelected + ']:checked').each(function() {
                    if ( valsCount > 1 ) {
                        vals = vals.replace(' and ', ', ');
                        if (valsCount > 2 ) {
                            vals = vals.slice(0, -9);
                        }
                        vals += ', and ' + (valsCount - 1) + ' more';
                    } else {
                        vals += (valsCount === 0) ? $(this).val() : ' and ' + $(this).val();
                    }
                    valsCount++;
                });

                em.find('em').remove();
                em.append('<em>' + vals + '</em>');
            } else if ( $('input[name=' + multiSelected + ']:checked').length < 1 ) {
                em.find('em').text('All');
            } else {
                em.find('em').remove();
                em.append('<em>' + $('input[name=' + multiSelected + ']:checked').val() + '</em>')
            }

        } else {

            if (selected.length < 1) {
                em.find('em').text('All');
                return;
            }

            em.find('em').remove();
            em.append('<em>' + val + '</em>');
        }

        if ( selectdReturn ) {
            return;
        }
    }, 751);
}

function setDataAttrNonVal(el, text) {
    var selectdReturn = el.data('return') !== undefined ? true : false;

    setTimeout(function() {
        
        el.attr('data-selected', text);

    }, 751);
}

function fuaxSubmit(el, parEl, ctx) {
    el.find('button:nth-child(2)').prop('disabled', true);
    setTimeout(function() {
        location.reload(true);
    }, 750);
}

function enableStickyButton(el, parEl, ctx) {
    var css = ctx ? 'fixed' : 'absolute',
        parCss = ctx ? 'absolute' : 'fixed';

    if ( !ctx ) {
        parEl.css('position', parCss);
        el.css('position', css).find('button').text('Apply Filters').prop('disabled', false);
        $('#content').show();
        return;
    }

    setTimeout(function() {
        parEl.css('position', parCss);
        el.css('position', css);
        $('#content').hide();
        window.scroll(0, 0);
    }, 251);

}