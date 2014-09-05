'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		Menus.addMenuItem('public', 'Articles', 'articles', 'menuItemURL', '/articles(/.*)?', true);
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/.*)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
	}
]);