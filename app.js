// gets a new object (the architecture allows us to not have to use the 'new' keyword here)
var g = G$('Jane', 'Doe');
g.greet().setLang('es').greet(true).log();

// let's use our object on the click of the login button
$('#login').click(function () {

    // create a new 'Greetr' object (let's pretend we know the name from the login)
    var loginGrtr = G$('John', 'Doe');

    // hide the login on the screen
    $('#logindiv').hide();

    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});