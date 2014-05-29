/*** SlideSidebarView ***/

define(function(require, exports, module) {

    // Import additional modules to be used in this view
    var Engine = require('famous/core/Engine');
    var View = require('famous/core/View');
    // var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Easing = require('famous/transitions/Easing');
    var ScrollView = require('famous/views/ScrollView');
    var RenderNode = require('famous/core/RenderNode');

    // Constructor function for our SlideSidebarView class
    function SlideSidebarView() {

        // Applies View's constructor function to SlideSidebarView class
        View.apply(this, arguments);

        this._toggleMenu = false;

        _createButton.call(this);
        _createThumbs.call(this);
    }

    // Establishes prototype chain for SlideSidebarView class to inherit from View
    SlideSidebarView.prototype = Object.create(View.prototype);
    SlideSidebarView.prototype.constructor = SlideSidebarView;

    // Default options for SlideSidebarView class
    SlideSidebarView.DEFAULT_OPTIONS = {
        size: [200, undefined],
        data: undefined,
        buttonSize: [50, 50],
        buttonImage: 'content/images/plus.svg'
    };

    SlideSidebarView.prototype.toggle = function() {
        this._toggleMenu = !this._toggleMenu;
        var angle = this._toggleMenu ? 3*Math.PI/4 : 0;
        this.buttonRotateModifier.setTransform(
            Transform.rotateZ(angle),
            { duration: 300, curve: Easing.outBack   }
        );

        var pos = this._toggleMenu ? 30 : -200;
        this.scrollModifier.setTransform(
            Transform.translate(pos, 100, 0),
            { duration: 300, curve: Easing.outBack   }
        );
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
        
        // On click handler
        button.on('click', this.toggle.bind(this));
    }

    function _createThumbs() {
        this.thumbs = [];

        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new ImageSurface({
                size: [100, 100],
                content: this.options.data[i]
            });

            var slideModifier = new StateModifier({
                size: [120, 120]
            });

            var node = new RenderNode();
            node.add(slideModifier).add(slide);

            slide._num = i;

            var handler = this._eventOutput; 
            slide.on('click', function(){
                handler.emit('thumb', this._num);
            });

            this.thumbs.push(node);
        }

        var scroll = new ScrollView();
        scroll.sequenceFrom(this.thumbs);
        Engine.pipe(scroll);


        this.scrollModifier = new StateModifier({
            size: this.options.size,
            transform: Transform.translate(-200,100,0)
        });

        this.add(this.scrollModifier).add(scroll);
    }

    module.exports = SlideSidebarView;
});
