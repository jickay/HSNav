import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { PostSecondary } from '../../api/postsecDB.js';
import { Session } from 'meteor/session';

import './post-sec.html';

Template.post_secondary.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('postsecondary');
});

Template.post_secondary.events({
   'submit .postsec-form'(event) {
       // Prevent default browser form submit
       event.preventDefault();

       // Get value from form element
       const target = event.target;
       const school = target.school.value;
       const program = target.program.value;
       const degree = target.degree.value;
       const requirements = target.requirements.value;

       var achievements = [];
       if (target.diploma.checked) { achievements.push(target.diploma.value); }
       if (target.certificate.checked) { achievements.push(target.certificate.value); }

       // Insert a course into the collection
       Meteor.call('postsecondary.insert', school, program, degree, requirements);

       // Clear form
       target.school.value = '';
       target.program.value = '';
       target.degree.value = '';
       target.requirements.value = "";

       target.diploma.checked = false;
       target.certificate.checked = false;

       // Reset focus
       target.school.focus();
   },
});