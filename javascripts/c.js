function wantToWanted(e){
  setTimeout(function(){
    $(e).text('Wanted');
  }, 500);
}
function wantedToWant(e){
  setTimeout(function(){
    $(e).text('Want');
  }, 500);
}

$(function(){
  var product = $('.product'),
    product_img = $('.has-alt-img'),
    want = product.find('span.want.action');

    product_img.hover(function(){
      var img = $(this).find('img'),
        src = img.src,
        alt_img = img.data('src');
      img.attr('src',alt_img);
    }, function(){
      var img = $(this).find('img'),
        src = img.data('o-src');
      img.attr('src',src);
    });

    want.on('click', function(){
      var wanted = $(this).next('.wanted'),
        wanted_text = wanted.text().replace('Wanted by ','');
        parseInt(wanted_text,10);
        // console.log(wanted_text, typeof wanted_text);

      if($(this).text()=='Wanted'){
        $(this).text('Removing...');
        wantedToWant($(this));
        wanted_text--;
        // console.log(wanted_text, typeof wanted_text);
        if(wanted_text===0){
          wanted.text('');
        }else{
          wanted.text('Wanted by '+ wanted_text);
        }
      }else{
        $(this).text('Wanting...');
        wantToWanted($(this));
        wanted_text++;
        // console.log(wanted_text, typeof wanted_text);
        wanted.text('Wanted by '+ wanted_text);
      }
    });

});