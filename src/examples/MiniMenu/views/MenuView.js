/*** MenuController ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Modifier = require('famous/core/Modifier');
    var Easing = require('famous/transitions/Transitionable');
    var Transitionable = require('famous/transitions/Transitionable');

    var MenuItemView = require('./MenuItemView');

    // Constructor function for our MenuController class
    function MenuController() {

        // Applies View's constructor function to MenuController class
        View.apply(this, arguments);

        _createMainItem.call(this);
    }

    // Establishes prototype chain for MenuController class to inherit from View
    MenuController.prototype = Object.create(View.prototype);
    MenuController.prototype.constructor = MenuController;

    // Default options for MenuController class
    MenuController.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here

    function _createMainItem() {
        var item = new MenuItemView();

        this.angle = new Transitionable(0);

        var rotateModifier = new Modifier({
            origin: [0.5,0.5],
            align: [0.5,0.5]
        });
        
        rotateModifier.transformFrom(function(){
            return Transform.rotateZ(this.angle.get());
        }.bind(this));

        this.add(rotateModifier).add(item);

        item.on('click', function(){
            var angle = this.angle.get() === 0 ? Math.PI/4*3 : 0;
            this.angle.set(angle,{ duration:200, curve: Easing.easeOut });
        }.bind(this));
    }

    module.exports = MenuController;
});
