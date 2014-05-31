/* Minimenu example */

define(function(require, exports, module) {
	var Engine = require('famous/core/Engine');

	var MiniMenu = require('./views/AppView');

	var menu = new MiniMenu();

	var mainContext = Engine.createContext();
	mainContext.add(menu);
});
