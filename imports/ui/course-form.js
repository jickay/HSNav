import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Courses } from '../api/coursesDB.js';

import './course-form.html';

Template.course_form.events({
  'submit .course-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const subject = target.subject.value;
    var number = parseInt(target.number.value);
    const title = target.title.value;
    const achievement = target.achievement.value;

    // Set level based on course number
    var level = 0;
    if (number < 20) { level = 10; }
    else if (number < 30) { level = 20; }
    else if (number < 40) { level = 30; }
    // const title = target.title.value;
    console.log(subject, number, level);

    // Insert a course into the collection
    Meteor.call('courses.insert', subject, number, level, title, achievement);

    // Clear form
    target.subject.value = '';
    target.number.value = '';
    target.title.value = '';

    // Reset focus
    target.subject.focus();
    target.achievement.value = "None";
  },
});
