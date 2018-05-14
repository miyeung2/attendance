var studentListItem = function(id, name, pictureUrl, cuisine, rating) {
  return `<div class="col-sm-4">
    <div class="mb-4">
      <p class="avatar" href="taqueria.html?id=${id}"><img  src="${pictureUrl}"></p>
      <div class="card-body">
        <h2 href="taqueria.html?id=${id}">${name}</h2>
        <div class="d-flex justify-content-center align-items-center">
          <div class="btn-group">
            <a href="taqueria.html?id=${id}" class="btn btn-sm btn-outline-secondary">Sign In</a>
            <button type="button" class="btn btn-sm btn-outline-secondary">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
function getParameterByName(name, url) {
   if (!url) url = window.location.href;
   name = name.replace(/[\[\]]/g, "\\$&");
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var cohortpage = getParameterByName("id", window.location.href);

$.getJSON( "https://api.airtable.com/v0/appvHLxB0MWtazDGx/Students?api_key=keyTC4j0i6n5JS2yX", function( data ) {
  // console.log(data.records);
  var items = [];
  items.push(`<div class="row">`);
  $.each( data.records, function( index, val ) {
    console.log(val.fields)
    var id = val.id;
    var name = val.fields["Full Name"];
    var pictureUrl = val.fields["Pictures"] ? val.fields["Pictures"][0].url : 'default.png';
    // var cuisine = val.fields["Cuisine"];
    var cohort = val.fields["Cohort"][0];
    console.log(cohort, cohortpage);
    if (!cohortpage || cohort === cohortpage){
      var itemHTML = studentListItem(id, name, pictureUrl);
      items.push(itemHTML);
    }
  });
  items.push(`</div>`);

  $(".avatars" ).append(items.join(""));
});
