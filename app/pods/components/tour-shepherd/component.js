import Ember from 'ember';

export default Ember.Component.extend({
	initialize: function() {
		var tour = new Tour({
		  steps: [
		  {
		    element: "#navigation",
		    title: "Title of my step",
		    content: "Content of my step"
		  },
		  {
		    element: "#news-feed",
		    title: "Title of my step",
		    content: "Content of my step"
		  }
		]});

		// Initialize the tour
		tour.init();

		// Start the tour
		tour.start();
	}.on('didInsertElement')
});
