//using the object with console:
// create a new object 
var g = G$("Z", "B");
g.greet().setLang("es").greet(true).log();


//using the object with HTML:
// let's use our object on the click of the login button
// $('#login'): This part uses jQuery's selector to find the HTML element with the ID "login". The # symbol indicates that it's selecting an element by its ID. 
// .click(function () { ... }): This is a jQuery method that attaches a function to be executed when the selected element is clicked. 
// function () { ... }: This is an anonymous function (a function without a name) that contains the code to be executed when the "login" element is clicked.

// we are passing function object that is created on the fly to the click event
$("#login").click(function () {

    // create a new 'Greetr' object the name from the login is "known" from login, as if returned by server
    var loginGrtr = G$("Zuz", "Bar");

    // hide the login on the screen
    $("#logindiv").hide();

    // HTML Greeting creates the JQuery object, only selector needs to be added
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});
