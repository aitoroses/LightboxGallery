/*** SlideshowView ***/

define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Lightbox = require('famous/views/Lightbox');
    var Easing = require('famous/transitions/Easing');

    var SlideView = require('./SlideView');

    function SlideshowView() {
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            size: this.options.size,
            origin: [0.5, 0],
            align: [0.5, 0]
        });

        this.mainNode = this.add(this.rootModifier);

        _createLightbox.call(this);
        _createSlides.call(this);

    }

    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    SlideshowView.DEFAULT_OPTIONS = {
        size: [450, 500],
        data: undefined,
        lightboxOpts: {
            inTransform: Transform.thenMove(Transform.rotateX(0.9), [0,-300,-300]),
            inOpacity: 1,
            inOrigin: [0,0],
            showOrigin: [0,0],
            showTransform: Transform.translate(0,0,0),
            outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
            outOpacity: 0,
            outOrigin: [0,0],
            inTransition: {duration: 650, curve: 'easeOut'},
            outTransition: {duration: 500, curve: Easing.inCubic}
        }
    };

    function _createLightbox() {
        this.lightbox = new Lightbox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }

    function _createSlides() {
        this.slides = [];
        this.currentIndex = 0;

        for (var i = 0; i < this.options.data.length; i++) {
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            // Event
            slide.on('click', this.showNextSlide.bind(this));
        }

        this.showCurrentSlide();

    }

    SlideshowView.prototype.showCurrentSlide = function showCurrentSlide() {
        this.ready = false;

        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide, function() {
            this.ready = true;
            slide.fadeIn();
        }.bind(this));
    };

    SlideshowView.prototype.showNextSlide = function showNextSlide() {
        if(!this.ready) return;

        this.currentIndex++;
        if (this.currentIndex === this.slides.length) this.currentIndex = 0;
        this.showCurrentSlide();
    };

    SlideshowView.prototype.showSlide = function showSlide(slideIndex) {
        this.currentIndex = slideIndex;
        this.showCurrentSlide();
    };

    module.exports = SlideshowView;
});
