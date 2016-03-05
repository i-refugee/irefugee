import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		start: function() {
			// Instance the tour
			console.log("asdf")
			var tour = new Tour({
			  steps: [
			  {
			    element: "#centers",
			    title: "Edw ta centers",
			    content: "Content of my step"
			  },
			  {
			    element: "#news-feed",
			    title: "Edw vlepete ta news feed",
			    content: "Content of my step"
			  }
			]});

			// Initialize the tour
			tour.init(true);

			// Start the tour
			tour.start(true);
		}
	}
});
