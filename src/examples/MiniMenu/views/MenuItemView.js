/*** MenuItemView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    // Constructor function for our MenuItemView class
    function MenuItemView() {

        // Applies View's constructor function to MenuItemView class
        View.apply(this, arguments);

        _createBackground.call(this);
    }

    // Establishes prototype chain for MenuItemView class to inherit from View
    MenuItemView.prototype = Object.create(View.prototype);
    MenuItemView.prototype.constructor = MenuItemView;

    // Default options for MenuItemView class
    MenuItemView.DEFAULT_OPTIONS = {
        iconContent: 'content/images/blackPlus.svg',
        backgroundContent: 'content/images/circle.svg',
        itemSize: 40
    };

    MenuItemView.DEFAULT_OPTIONS.iconSize = MenuItemView.DEFAULT_OPTIONS.itemSize * 0.7;

    // Define your helper functions and prototype methods here

    function _createBackground() {
        var overlay = new Surface({
            size: [this.options.itemSize, this.options.itemSize]
        });

        overlay.on('click', function(){
            this._eventOutput.emit('click');
        }.bind(this));

        var background = new ImageSurface({
            content: this.options.backgroundContent,
            size: [this.options.itemSize, this.options.itemSize],
            properties: {
                zIndex: 1,
                pointerEvents: 'none'
            }
        });

        var iconModifier = new StateModifier({
            transform: Transform.translate(0,0,2)
        });

        var icon = new ImageSurface({
            content: this.options.iconContent,
            size: [this.options.iconSize, this.options.iconSize],
            properties: {
                zIndex: 2,
                pointerEvents: 'none'
            }
        });

        this.add(overlay);
        this.add(background);
        this.add(iconModifier).add(icon);
    }

    module.exports = MenuItemView;
});
