/*** MenuController ***/

/* eslint no-use-before-define: 0 */
// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Modifier = require('famous/core/Modifier');
    var Easing = require('famous/transitions/Easing');
    var Transitionable = require('famous/transitions/Transitionable');

    var MenuItemView = require('./MenuItemView');

    // Constructor function for our MenuController class
    function MenuController() {

        // Applies View's constructor function to MenuController class
        View.apply(this, arguments);

        this._items = this.options.items;
        this._itemMods = [];
        this.active = false;

        _createMainItem.call(this);
        _createItems.call(this);
    }

    // Establishes prototype chain for MenuController class to inherit from View
    MenuController.prototype = Object.create(View.prototype);
    MenuController.prototype.constructor = MenuController;

    MenuController.prototype.toggle = function toogle() {
        this.active = !this.active;
        _animateItems.call(this);
    };

    // Default options for MenuController class
    MenuController.DEFAULT_OPTIONS = {
        items: [{}, {}, {}, {}, {}, {}],
        startRotation: 2*Math.PI * (-3/8 - 0.05),
        maxRotation: Math.PI * 1.1,
        radius: 100
    };

    // Define your helper functions and prototype methods here

    function _createMainItem() {
        var item = new MenuItemView({
            iconSize: 40,
            properties: {
                zIndex: 1
            }
        });

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
            var angle = this.angle.get() === 0 ? (1 + 3/8)*2*Math.PI : 0;
            this.angle.set(angle,{ duration:500, curve: Easing.outBack });
            this.toggle();
        }.bind(this));
    }

    function _createItems() {
        this.options.items.forEach(_addMenuItem.bind(this));
        _animateItems.call(this);
    }

    function _animateItems() {

        this._itemMods.forEach(function(posModifier, index) {

            // Set rotation offset for each item
            var offset = this.options.maxRotation * (index / (this._items.length - 1));

            var coords = {
                x: this.active ? this.options.radius * Math.cos(this.options.startRotation + offset) : 0,
                y: this.active ? this.options.radius * Math.sin(this.options.startRotation + offset) : 0
            };

            setTimeout(function(){
                posModifier.setTransform(
                    Transform.translate(coords.x, coords.y, -10),
                    { duration: 500, curve: Easing.outBack }
                );
                posModifier.setOpacity(
                    this.active ? 1 : 0,
                    { duration: 250, curve: 'linear' }
                );
            }.bind(this), 50 * index);
            
        }.bind(this));
    }

    function _addMenuItem(menuItem) {
        var item = new MenuItemView();
        
        var posModifier = new StateModifier({
            origin: [0.5,0.5],
            align: [0.5,0.5]
        });

        this._itemMods.push(posModifier);
        this.add(posModifier).add(item);
    }

    module.exports = MenuController;
});
