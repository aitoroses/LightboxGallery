/*** AppView ***/

/* eslint no-use-before-define: 0 */
define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    // var Surface = require('famous/core/Surface');


    var SlideshowView = require('views/SlideshowView');
    var SlideSidebarView = require('views/SlideSidebarView');

    function AppView() {
        View.apply(this, arguments);

        _createCamera.call(this);
        _createSlideshow.call(this);
        _createSidebar.call(this);
        _createBackground.call(this);
    }

    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        data: undefined,
        cameraWidth: 0.5 * window.innerHeight,
        backgroundImage: 'content/images/black-gradient-background.png'
    };

    AppView.DEFAULT_OPTIONS.slideWidth = 0.8 * AppView.DEFAULT_OPTIONS.cameraWidth;
    AppView.DEFAULT_OPTIONS.slideHeight = AppView.DEFAULT_OPTIONS.slideWidth + 40;
    AppView.DEFAULT_OPTIONS.slidePosition = 0.77 * AppView.DEFAULT_OPTIONS.cameraWidth;

    function _createCamera() {
        var camera = new ImageSurface({
            size: [this.options.cameraWidth, true],
            content: 'content/images/camera.png',
            properties: {
                width: '100%'
            }
        });

        var cameraModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.behind
        });

        this.add(cameraModifier).add(camera);
    }

    function _createSlideshow() {
        // Create a new instance of slideshow view
        var slideshowView = new SlideshowView({
            size: [this.options.slideWidth, this.options.slideHeight],
            data: this.options.data
        });


        var slideshowModifier = new StateModifier({
            origin: [0.5, 0],
            align: [0.5, 0],
            transform: Transform.translate(0, this.options.slidePosition, 0)
        });

        var slideshowContainer = new ContainerSurface({
            properties: {
                overflow: 'hidden'
            }
        });

        // Add it to the app view
        this.add(slideshowModifier).add(slideshowContainer);
        slideshowContainer.add(slideshowView);
        slideshowContainer.context.setPerspective(1000);

    }

    function _createBackground() {
        var background = new ImageSurface({
            content: this.options.backgroundImage,
            properties: {
                zIndex: -1
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(backgroundModifier).add(background);
    }

    function _createSidebar() {
        // Create a new instance
        var sidebar = new SlideSidebarView();
        this.add(sidebar);
    }

    module.exports = AppView;
});
