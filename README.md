
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
        '¢/Pg'          : '9'                       // < '¢/Pg'? ru kidding me?
    }
    
    // 
    // ^--- Eww. What the hell is up with this data.
    // 
    

Behold the mighty obender.

## Obender does.

Obender's got a mighty remap function.

    obender(object)
        .remap({
            'Queue Name' :  'queue_name',
            'Printer Name'   :  'printer_name',
            'Printer Model'  :  'printer_model',
        });

    // >> { queue_name: 'wsh1',
    //      printer_name: 'WSH Browsing Library 1',
    //      printer_model: 'Xerox Phaser 4510DT',
    //      'Color': 'B/W',
    //      'DPI': '600',
    //      'Duplex': 'Two-sided',
    //      '¢/Pg': '9'
    // }


It's mightier still.

    obender(object)
        .remap({

            'dpi'    : {'dpi'    : parseInt },

            'Color'  : {'color'  : function (value) { 
                                return value === 'Color'; } },
            
            'Duplex' : {'duplex' : function (value) { 
                                return value === "Two-sided"; } },
            
            '¢/Pg'   : {'price'  : function (value) { 
                                return parseFloat(value) / 100; } }
        });

    // >> { queue_name: 'wsh1',
    //      printer_name: 'WSH Browsing Library 1',
    //      printer_model: 'Xerox Phaser 4510DT',
    //      color: false,
    //      dpi: 600,
    //      duplex: true,
    //      price_per_page: 0.09
    // }


It's also got a mighty forEach function.

    var object = {
        'First Name'  : 'Severus',
        'Last Name'   : 'Potter',
        'Wand'        : null
    }
    
    obender(object)
        .forEach(function(property) {
            property.key = property.key.toLowerCase().replace(/\w/, "_");

            if (property.value === null) 
                property.delete();
        });

    // >> { first_name: 'Severus',
    //      last_name: 'Potter',
    // }

Obender likes escaping objects. He did it before it was cool.


## Obender matches.

    var object = {
        'Name'              : 'Functional Programming and Data Structures',
        'Subject'           : 'CS',
        'Catalog Number'    : '3110',
        'Grading Basis'     : 'Student Opt.',
        'Units'             : 4,
        'Class Description' : ''
    }
        
    // Returns all the keys with whitespace.
    obender(object)
        .match(/\w/)
        .keys();        
    
    
    // >> ["Catalog Number", "Grading Basis", "Class Description"] 


You can also do stuff with those keys.

    var object = {
        'real_name' : 'Bruce',,
        'real_last_name' : 'Wayne',
        'super_name' : 'Batman',
        'super_song' : 'Nananananananananananananananana! Batman!'
    }

    // Deletes all properties without 'super' on their keys.
    obender(object)
        .match(\^((?!super).)*$\)
        .delete();
    
    // >> { 'super_name' : 'Batman',
    //      'super_song' : 'Nananananananananananananananana! Batman!'
    // } 


And chain methods, of course.

    var object = {          
        'Queue Name'    : 'wsh1',
        'Printer Name'  : 'WSH Browsing Library 1',
        'Printer Model' : 'Xerox Phaser 4510DT',
        'Color'         : 'B/W',
        'DPI'           : '600',
        'Duplex'        : 'Two-sided',
        '¢/Pg'          : '9'
    }
    
    obender(object)

        // Deletes all properties except those whith whitespace and "Color"
        .match(/\w/)
        .unmatch(\Color\)
        .delete()

        // Escapes the ones with 'Name'
        .match(\Name\)
        .forEach(function (property) {
            property.key = property.key.toLowerCase().replace(/\w/, "_");
        });
    
        // >> { queue_name: 'wsh1',
        //      printer_name: 'WSH Browsing Library 1',
        //      'Color': 'B/W'
        // }






