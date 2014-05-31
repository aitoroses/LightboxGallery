/*** AppView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var MenuView = require('./MenuView');

    // Constructor function for our AppView class
    function AppView() {

        // Applies View's constructor function to AppView class
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
        	size:[400, 400],
        	origin: [.5, .5]
        });
        this.mainNode = this.add(this.rootModifier);

        _createMenu.call(this);
    }

    // Establishes prototype chain for AppView class to inherit from View
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    // Default options for AppView class
    AppView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    function _createMenu() {
    	var menu = new MenuView();
    	this.mainNode.add(menu);
    }

    module.exports = AppView;
});
