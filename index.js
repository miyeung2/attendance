var cohortListItem = function(id, name, pictureUrl) {
  return `<a href="cohort.html?id=${id}"><img class="cohort-pics" src="${pictureUrl}"></a>
  <br><h2><a href="cohort.html?id=${id}">${name}</a></h2><br>
  `;
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
var cohortpage = getParameterByName("Cohorts", window.location.href);

$.getJSON( "https://api.airtable.com/v0/appvHLxB0MWtazDGx/Cohorts?api_key=keyTC4j0i6n5JS2yX", function( data ) {
  // console.log(data.records);
  var items = [];
  items.push(`<div class="">`);
  $.each( data.records, function( index, val ) {
    console.log(val.fields)
    var id = val.id;
    var name = val.fields["Name"];
    var pictureUrl = val.fields["Picture"] ? val.fields["Picture"][0].url : 'default.png';
      var itemHTML = cohortListItem(id, name, pictureUrl);
      items.push(itemHTML);
  });
  items.push(`</div>`);

  $(".cohort-locations" ).append(items.join(""));
});
