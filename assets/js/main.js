var separator = "|";

var alphabetUsed = [];

function Bd() {
  this.title;
  this.authors;
  this.isbn;
  this.cover = function() {
    return "http://covers.openlibrary.org/b/isbn/" + this.isbn + "-M.jpg";
  };
}

var bds = [];

function show() {
  showAlphabet();
  showBds();
}

function showBds() {
  for(a=0;a<alphabetUsed.length;a++)
  {
    $('#container').append(
            '<div class="alphabet-anchor" id="alphabet-' + alphabetUsed[a] + '">' + alphabetUsed[a] + '</div>'
            );
    for(b=0;b<bds.length;b++)
    {
      if(bds[b].title[0].toUpperCase() === alphabetUsed[a])
      {
        $('#container').append(
            Mustache.render('<div class="item"><div class="item-cover"><img src="{{ cover }}"/></div><div class="item-title">{{title}}</div></div>', bds[b])
            );
      }
    }
  }
}

function showAlphabet() {
  alphabetUsed.sort();
  $('#container').append('<div class="alphabet">');
  for(a=0;a<alphabetUsed.length;a++)
  {
    $('#container').append('<a href="#alphabet-' + alphabetUsed[a] + '" class="alphabet-link">' + alphabetUsed[a] + '</a>');
  }
  $('#container').append('</div>');
}

function updatePositionGoTop() {
  $('.go-top').css('top', $(document).scrollTop());
  if($(document).scrollTop() > 10)
    $('.go-top').show();
  else
    $('.go-top').hide();
}

$(function() {

  $(document).on('scroll', function () {
    updatePositionGoTop();
  });

  $('.go-top').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  });


  $.get('list.csv', function(csv) {

    var lines = csv.split("\n");

    $.each(lines, function(n, elem) {
      if (n == 0)
        return;

      var data = elem.split(separator);

      var bd = new Bd();
      bd.title = data[0];
      bd.authors = data[1];
      bd.isbn = data[5];

      if(bd.title[0] !== undefined)
      {

        var firstLetter = bd.title[0];

        if(alphabetUsed.indexOf(firstLetter) === -1)
          alphabetUsed.push(firstLetter);

        bds.push(bd);
      }
    });


    bds.sort();

    show();
  });
});