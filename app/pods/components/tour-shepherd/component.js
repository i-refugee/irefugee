import Ember from 'ember';

export default Ember.Component.extend({
	tour: Ember.inject.service(),
	session: Ember.inject.service(),
	checkIfDone: function() {
		if (!this.get('session.data.shepherd')) {
			this.get('session').set('data.shepherd', true);
			Ember.run.once(this, this.runTour);
		}
	}.on('didInsertElement'),
	runTour: function() {
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
		          text: 'ΕΞΟΔΟΣ',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΒΗΜΑ',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΕΠΟΜΕΝΟ ΒΗΜΑ',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text shepherd-box',
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
		      attachTo: '#edit-center-description top',
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
		          text: 'ΕΞΟΔΟΣ',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΒΗΜΑ',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΕΠΟΜΕΝΟ ΒΗΜΑ',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text shepherd-box',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Στοιχεία Ομάδας',
		      text: ['Εδώ μπορείς να βάλεις τα στοιχεία της ομάδας σου. Συνίσταται να συμπληρώσεις <br> όλα τα στοιχεία, για την καλύτερη εξυπηρέτηση του χρήστη.']
		    }
		  },
{
		    id: '2nd',
		    options: {
		      attachTo: '#edit-location right',
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
		          text: 'ΕΞΟΔΟΣ',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΒΗΜΑ',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΕΠΟΜΕΝΟ ΒΗΜΑ',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text shepherd-box',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Τοποθεσία Ομάδας',
		      text: ['Εδώ μπορείς να βάλεις την τοποθεσία σου στο χάρτη.']
		    }
		  },
{
		    id: '3rd',
		    options: {
		      attachTo: '#edit-keys bottom',
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
		          text: 'ΕΞΟΔΟΣ',
		          type: 'cancel'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΒΗΜΑ',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΕΠΟΜΕΝΟ ΒΗΜΑ',
		          type: 'next'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text shepherd-box',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: false,
		      showCancelLink: true,
		      title: 'Άμεσες Ανάγκες',
      		text: ['Εδώ μπορείς να επιλέξεις τις άμεσες ανάγκες σου από μια βάση δεδομένων με εξειδικευμένες λέξεις κλειδιά. Συνίσταται, αν όχι επιβάλλεται, να ανανεώνετε τακτικά τη συγκεκριμένη ενότητα ώστε να απελευθερώνετε  λέξεις κλειδιά για άλλες ομάδες όταν δεν τις έχετε πια ανάγκη.']
		    }
		  },
{
		    id: '4th',
		    options: {
		      attachTo: '#edit-center-need top',
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
		          classes: 'shepherd-button-primary',
		          text: 'ΠΡΟΗΓΟΥΜΕΝΟ ΒΗΜΑ',
		          type: 'back'
		        },
		        {
		          classes: 'shepherd-button-primary',
		          text: 'ΤΕΛΟΣ ΠΕΡΙΗΓΗΣΗΣ',
		          type: 'cancel'
		        }
		      ],
		      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text shepherd-box',
		      copyStyles: false,
		      highlightClass: 'highlight',
		      scrollTo: true,
		      showCancelLink: true,
		      title: 'Συμπλήρωση Αναγκών',
      		  text: ['Εδώ μπορείς να συμπληρώσεις μέσα στο πεδίο τις κάθε ενότητας αναγκών τις ανάγκες σου.  Απο κάτω, μπορείς να ρυθμίσεις αν η κάθε ενότητα αναγκών είναι άμεσης, μέσης ή μικρής σημαντικότητας ώστε να διευκολύνεται  η αναζήτηση του χρήστη για τις σημαντικότερες ανάγκες της εκάστοτε ομάδας.  Συνίσταται να ανανεώνετε τακτικά τη σημαντικότητα για να αποδεσμεύετε θέσεις στην αναζήτηση για τις ομάδες  που έχουν μεγαλύτερη ανάγκη την εκάστοτε χρονική περίοδο.']


		    }
		  }


		]);


		this.get('tour').start();


	}
});
