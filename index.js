


var pillArea = $('#pillBtns');
var gifArea = $('#giphies');
var searchQuery = $('#searchTerm');
var searchButton = $('#searchBtn');
var topics = ['lion', 'tiger', 'shark', 'cat'];
var apiKey = 'zRa2s00R6RKzoG6XMeQNeC8ac9mAK0E5';

function search(query) {

    query = query.replace(' ', '+');
    $.ajax({
        url: 'http://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + query + '&limit=10&rating=g&lang=en',

    }).done(function (data) {

        gifArea.html('');

        for (var i = 0; i < data.data.length; i++) {
            var gif = $('<img>');
            gif.attr('src', data.data[i].images.original_still.url);
            gif.attr('width', '150');
            gif.attr('height', '150');
            gif.attr('data-still', data.data[i].images.original_still.url);
            gif.attr('data-animated', data.data[i].images.original.url);
            gif.addClass('m-3');
            gif.hover(function () {
                $(this).attr('src', $(this).attr('data-animated'));
            }, function () {
                $(this).attr('src', $(this).attr('data-still'));
            });
            gifArea.append(gif);
        }


    });


}

$(document).ready(function () {
    var storeDAta = localStorage.getItem('topik');
    if(storeDAta){
        topics = storeDAta.split(',');
    }
    searchButton.click(function () {
        search(searchQuery.val());
        if(topics.indexOf(searchQuery.val()) > -1){
            return;
        }
        topics.push(searchQuery.val());
         createPills();
         localStorage.setItem('topik',topics);

    });

    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        searchButton.click();
        return false;
    });



    createPills();


});

function createPills() {
    pillArea.html("");
    for (var i = 0; i < topics.length; i++) {
        var pill = $('<span></span>');
        pill.addClass('badge badge-pill badge-primary mr-2 text-uppercase p-2');
        pill.html(topics[i]);
        pill.click(function () {
            search($(this).html());
        });
        pillArea.append(pill);
    }
}