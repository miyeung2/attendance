$.getJSON( "https://api.airtable.com/v0/appvHLxB0MWtazDGx/Students?api_key=keyTC4j0i6n5JS2yX", function( data ) {
  // console.log(data.records);
 var items = [];
  $.each( data.records, function( index, val ) {
    console.log(val.fields["Full Name"])
    items.push( "<li id='" + val.id + "'>" + val.fields["Full Name"] + "</li>" );
  });

  $( "<ol/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
});
