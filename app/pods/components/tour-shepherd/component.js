import Ember from 'ember';

export default Ember.Component.extend({
	tour: Ember.inject.service(),
	initialize: function() {
		let tour = this.get('tour');

		tour.set('defaults', {
		  classes: 'shepherd-element shepherd-open shepherd-theme-arrows',
		  scrollTo: true,
		  showCancelLink: true
		});

//		tour.set('disableScroll', false);
		tour.set('modal', false);

/*		this.get('tour').set('requiredElements', [
		  {
		    selector: '#navigation',
		    message: 'No search results found. Please execute another search, and try to start the tour again.',
		    title: 'No results'
		  }]
		);
*/
		tour.set('steps', [
		  {
		    id: 'intro',
		    options: {
		      attachTo: '#navigation bottom',
/*		      beforeShowPromise: function() {
		        return new Promise(function(resolve) {
		          Ember.run.scheduleOnce('afterRender', this, function() {
		            window.scrollTo(0, 0);
		            this.get('documents.firstObject').set('isSelected', true);
		            resolve();
		          });
		        });
		      },*/
		      builtInButtons: [
		        {
		          classes: 'shepherd-button-secondary',
		          text: 'Exit',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Back',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Next',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Καλώς ήρθες στο irefugee!',
		      text: ['']
		    }
		  },
{
		    id: '2nd',
		    options: {
		      attachTo: '#address top',
/*		      beforeShowPromise: function() {
		        return new Promise(function(resolve) {
		          Ember.run.scheduleOnce('afterRender', this, function() {
		            window.scrollTo(0, 0);
		            this.get('documents.firstObject').set('isSelected', true);
		            resolve();
		          });
		        });
		      },*/
		      builtInButtons: [
		        {
		          classes: 'shepherd-button-secondary',
		          text: 'Exit',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Back',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Next',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Στοιχεία Ομάδας',
		      text: ['Εδώ μπορείς να βάλεις τα στοιχεία της ομάδας σου']
		    }
		  },
{
		    id: '2nd',
		    options: {
		      attachTo: '#map-canvas-one bottom',
/*		      beforeShowPromise: function() {
		        return new Promise(function(resolve) {
		          Ember.run.scheduleOnce('afterRender', this, function() {
		            window.scrollTo(0, 0);
		            this.get('documents.firstObject').set('isSelected', true);
		            resolve();
		          });
		        });
		      },*/
		      builtInButtons: [
		        {
		          classes: 'shepherd-button-secondary',
		          text: 'Exit',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Back',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'Next',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Στοιχεία Ομάδας',
		      text: ['Εδώ μπορείς να βάλεις την τοποθεσία σου στο χάρτη']
		    }
		  }


		]);
		console.log($(".center-need"))
		this.get('tour').start();

	}.on('didInsertElement')
});
