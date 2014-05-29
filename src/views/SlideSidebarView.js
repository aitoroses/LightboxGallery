/*** SlideSidebarView ***/

/* eslint no-use-before-define: 0 */
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    // var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');


    // Constructor function for our SlideSidebarView class
    function SlideSidebarView() {

        // Applies View's constructor function to SlideSidebarView class
        View.apply(this, arguments);

        _createButton.call(this);
    }

    // Establishes prototype chain for SlideSidebarView class to inherit from View
    SlideSidebarView.prototype = Object.create(View.prototype);
    SlideSidebarView.prototype.constructor = SlideSidebarView;

    // Default options for SlideSidebarView class
    SlideSidebarView.DEFAULT_OPTIONS = {
        size: [200, undefined],
        buttonSize: [50, 50],
        buttonImage: 'content/images/plus.svg'
    };

    // Define your helper functions and prototype methods here
    function _createButton() {
        var button = new ImageSurface({
            size: this.options.buttonSize,
            content: this.options.buttonImage,
            properties: {
                zIndex: 3
            }
        });

        var buttonPositionModifier = new StateModifier({
            transform: Transform.translate(50,50,0)
        });

        this.buttonRotateModifier = new StateModifier({
            origin: [.5,.5],
            align: [0,0],
            transform: Transform.rotateZ(0)
        });

        this.add(buttonPositionModifier).add(this.buttonRotateModifier).add(button);
    }

    module.exports = SlideSidebarView;
});
