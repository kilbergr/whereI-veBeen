# whereI'veBeen

A single page app to show all the places you've traveled. You're given a simple CRUD app for places. Your job will be to make the root route a single page app that uses ajax

###Steps

Add a form to the root route for creating places. Add an input for address, latitude and longitude. On submit, the form should make an ajax post request to your express app to save the new place. Do not refresh the page!
Display the list of places from your database on your root route. So on page load, you should be able to see all of the places you've entered
Adding the lat and long is a little strange. We usually don't remember that we took a trip to latitude 45.4057148 and longitude 12.3817426 (Venice, Italy). Instead use the google geocode api. On the server side, if the lat and long is empty in the body of the request, make a request to the geo location api to get the latitude and longitude of the address that the user gave you.  

Listing out all of our places is also a little strange. It would be much better if all of the places where on the map. Use the google maps api to add each of your places in the database as icons on the map.
Now to add a new place, allow the user to click a point on the map. The click should add a marker and trigger an ajax post to your server to save the lat and long. (This is a stretch goal so don't worry too much if you don't get here).
Hint

The geocoding api is <a href="https://developers.google.com/maps/documentation/geocoding/" target="_blank">here</a>  
A sample request looks like this: http://maps.googleapis.com/maps/api/geocode/json?address=paris,france  
The google maps docs has many examples of how to use maps. Check it out <a href="https://developers.google.com/maps/documentation/javascript/" target="_blank">here</a>.  
The starter code already has a map setup for you. Look at the examples to figure out how to add a pin.  
The <a href="https://developers.google.com/maps/documentation/javascript/examples/marker-simple" target="_blank">simple marker example</a> would be a good one to look at as well.

###BONUS

Add handlebars templating
Add authentication and authorization. Only show your places on the map.
Add a map callout for each icon that allows the user to delete the location.
