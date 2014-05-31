/*** main.js ***/

define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Utility = require('famous/utilities/Utility');
    
    // import the AppView class using require
    var AppView = require('./views/AppView');

    // import SlideData
    var SlideData = require('./data/SlideData');

    var mainContext = Engine.createContext();

    // Get request to the picasa with callback
    Utility.loadURL(SlideData.getUrl(), initApp);

    function initApp(data) {
    	// parses out reponse data and retrieves array of urls
        data = SlideData.parse(data);

        // instantiates AppView with our url data
        var appView = new AppView({ data : data });

        mainContext.add(appView);

        mainContext.setPerspective(1000);
    }
});
