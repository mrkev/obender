
Obender [![Build Status](https://secure.travis-ci.org/mrkev/obender.png?branch=master)](https://travis-ci.org/mrkev/obender)
===============

Obender is an object bender

    ('')  .^.  ('')     
     \ ' ('_') ' /       ____  ____  _____ _      ____  _____ ____
       \       /        /  _ \/  _ \/  __// \  /|/  _ \/  __//  __\
        l . . l         | / \|| | //|  \  | |\ ||| | \||  \  |  \/|
        I . . I         | \_/|| |_\\|  /_ | | \||| |_/||  /_ |    /
       /./---\.\        \____/\____/\____\\_/  \|\____/\____\\_/\_\
      ///     \\\       

You've been there. You get some json from the server in eww state and you 'litteraly can't even'. 

    var object = {          
        'Queue Name'    : 'wsh1',                   // < Umm spaces on names sux
        'Printer Name'  : 'WSH Browsing Library 1', //   cuz we can't be like
        'Printer Model' : 'Xerox Phaser 4510DT',    //   object.printer_model /:
        'Color'         : 'B/W',                    // < Should be a boolean tho
        'DPI'           : '600',                    // < Ugh... strings smh
        'Duplex'        : 'Two-sided',              // < Could be a boolean too.
        '¢/Pg'           : '9'                       // < '¢/Pg'? ru kidding me?
    }
    
    // 
    // ^--- Eww. What the hell is up with this data.
    // 
    

Behold the mighty obender.

## Obender does.

Obender's got a mighty remap function.

    obender(object)
        .remap({'Queue Name'    :  'queue_name',
            'Printer Name'  :  'printer_name',
            'Printer Model' :  'printer_model',
            'DPI'           :  'dpi'
        });


It's mightier than you think.

    obender(object)
        .remap({'Color'  : {'color'  : function (value) { 
                                   return value === 'Color'; } },
            
            'Duplex' : {'duplex' : function (value) { 
                                   return value === "Two-sided"; } },
            
            '¢/Pg'   : {'price'  : function (value) { 
                                   return parseFloat(value) / 100; } }
        });


It's also got a mighty forEach function.

    obender(object)
        .forEach(function(property) {
            property.key.replace(/\w/, "_");

            if (typeof property.value === "function") {
                delete this[property.key];
            }
        });


Obender likes escaping of objects. He did it before it was cool.


## Obender matches.

    var obender  = require('obender');
        
    obender(object)
        .match(/\w/g)
        .keys();        
    
    
    > ["Queue Name", "Printer Name", "Printer Model"] 
    // Returns all the keys with whitespace.


You can also do stuff with those keys.

    obender(object)
        .match(\^((?!Name).)*$\)
        .delete();

    // Deletes all properties without 'Name' on their keys.

And chain methods, of course.

    obender(object)
        .unmatch(/\w/)
        .unmatch(\Color\)
        .delete()

        // Deletes all properties except those whith whitespace and "Color"

        .match(\Name\)
        .forEach(function (property) {
            property.key.replace(/\w/, "_");
        });

        // Removes whitespace of all properties containing "Name"


    

    // >> { queue_name: 'wsh1',
    //      printer_name: 'WSH Browsing Library 1',
    //      printer_model: 'Xerox Phaser 4510DT',
    //      color: false,
    //      dpi: '600',
    //      duplex: true,
    //      price_per_page: 0.09 }

