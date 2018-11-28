$(document).foundation()

//identify when safe search is on
$('input#safe-check').click(function() {
	if($(this).hasClass('checked')){
		$(this).removeClass('checked');
	} else {
		$(this).addClass('checked');
	}
});

function handleButtonClick() {
	//remove existing search results
	$( ".large-3.medium-3.small-12.cell" ).remove();
	//get new search results
	$.ajax({
	    url: 'https://api.flickr.com/services/feeds/photos_public.gne?format=json',
	    dataType: 'jsonp',
	    data: { "tags": $('input.animated-search-form').val(), "format": "json" }
	});
}

//call ajax function when user searches
$('input[type="submit"]').on("click", handleButtonClick);
	
function jsonFlickrFeed(json) {
    console.log(json);

	$.each(json.items, function(i, item) {
		var photoList = $('#photo-list');
		var photoLink = item.link;
		var photoURL = '<a href="' + photoLink + '"><img src="' + item.media.m + '" /></a>';
		var photoTitle = '<a href="' + photoLink + '" class="photo-title">' + item.title + '</a>';
		var authorProfile = "https://www.flickr.com/people/" + item.author_id;
		var photoAuthor = '<a href="' + authorProfile + '" class="photo-author">' + item.author + '</a>';
		var photoTags = '<div class="photo-tags"><b>Tags:</b> ' + item.tags + '</div></div>';
		var photoDesc = '<div class="photo-description"><b>Description:</b> ' + item.description + '</div>';
		var inputValue = $('input.animated-search-form').val();

		var photoContent = '<div class="photo-container callout">' + photoURL + '<div class="photo-header"> '+ photoTitle +' by ' + photoAuthor + '</div>' + photoDesc + photoTags;
		var photoContainer = '<div class="large-3 medium-3 small-12 cell">' + photoContent + '</div>';

		if ($('input#safe-check').hasClass('checked')) {
			if(photoTags.includes("safe")) {
		  		$(photoContainer).appendTo(photoList);
		  	}
		} else {
		  	$(photoContainer).appendTo(photoList);
		}

	  	if (i === 31) {
			return false;
		}
	});
};

