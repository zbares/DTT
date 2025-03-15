// addition of semicolon at the beginning of the library if the one in front of it in the index.html is not finished off properly

; (function (global, $) {

    // creation of a new object using function constructor and the "new" keyword
    var Greetr = function (firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    // variables not directly accessible since they are hidden within the scope of the IIFE
    // However, the Greetr prototype methods can utilize these variables because they reside within the same lexical environment. Closure allows these methods to retain access to these variables, even after the execution of the Immediately Invoked Function Expression (IIFE) has completed

    var supportedLangs = ['en', 'es'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        es: 'Hola'
    };

    // formal greetings
    var formalGreetings = {
        en: 'Good Day',
        es: 'Saludos'
    };

    // good code includes logger messages
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };

    // properties of these variables can be dynamically referenced using bracket notation

    // prototype holds methods (to save memory space), these methods are accessible for the newly created object. as a result we have all the methods and properties in a single object literal 

    // Prototype methods are defined on the xx.prototype object. They are shared by all instances of the xx object. Since they are separate from the constructor function, they do not have access to the local properties of the constructor.

    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function () {
            // without "this" keyword, language would be evaluated as an undefined variable since it is not declared in the function scope. scope chain then goes to global execution context in which it also is not defined.

            return this.firstName + ' ' + this.lastName;

            // there needs to be a comma since we are adding methods/functionalitites to the objects
        },

        validate: function () {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure based on where this function sits lexically and it goes up the scope chain

            //supportedLangs.indexOf(this.language) checks if the language exists in the supportedLanfs array and if not, the index is -1
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },

        // retrieve messages from object by referring to properties using [] syntax
        greeting: function () {

            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function () {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        // chainable methods return their own containing object
        greet: function (formal) {
            var msg;

            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable

            // How it works: (1) Method Call: When you call object.greet(), the greet method executes. (2)Returning this: Inside the greet method, the statement return this; returns the object itself (the object that the greet method was called upon). (3) Chaining: Since the greet method returns the object, you can immediately call another method on the returned object.
            return this;
        },

        log: function () {
            // manual ensurement that sth is logged
            // Internet Explorer does not have an console variable unless console is open so as long as the console object is available it will console.log
            // if there is no console object, it will return falsy and the message will not be logged
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }

            // makes the method chainable
            return this;
        },

        // function that changed language on the fly >> usage: e.g., .greet in English, set the language to Spanish and .greet again


        // lang parameter takes in the new language we want
        setLang: function (lang) {

            // set the language (meaning update the object with a new language)
            this.language = lang;

            // validate the language is valid
            this.validate();

            // makes the method chainable
            return this;
        },

        // adding jQuery support: giving it a selector which is then used to create jQuery object and then the text of the element is filled in

        // method that accepts jQuery selector and whether or not it is a formal greeting and then updates the value of whatever the selector is (it should accept any selector, any string, create jQuery object from it and update the text inside index.html, meaning inside the html), sets up the greeting itself and updates whatever value is there
        HTMLGreeting: function (selector, formal) {
            // check if we have jQuery and a selector
            if (!$) {
                throw 'jQuery not loaded';
            }

            if (!selector) {
                throw 'Missing jQuery selector';
            }

            // determine the message
            var msg;
            if (formal) {
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            // function takes in string (in the parameter above) and it is passed down here into the jQuery object
            $(selector).html(msg);
            // possible to add a validation here what the results of the selector are 

            // makes the method chainable
            return this;
        }

    };

    // the actual object is created here (this function is returned above) allowing us to create a new object using function constructor without calling "new" keyword
    Greetr.init = function (firstName, lastName, language) {
        // self and this points to the newly created object based on the "new" keyword
        var self = this;
        // || is used to set default values
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';

        // validate language when the object is initially created
        self.validate();

    }

    // with new keyword, __proto__ of the new object is pointing to prototype object of the function constructor which created it; shortened and more elegant approach, all other properties and methods are defined in Greetr.prototype since it is referenced here
    Greetr.init.prototype = Greetr.prototype;

    // attaching the Greetr to the global object, and provide a shorthand '$G'
    global.Greetr = global.G$ = Greetr;


    // global is used in IIFE and references window object
    // possible to add a validation here if window object exists or not
}(window, jQuery));
// jQuery added so it can be replaced with different library if it functions in the same way


