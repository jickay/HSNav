import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Courses } from '../../api/coursesDB.js';

import './course-form.html';

Template.course_form.events({
  'submit .course-form'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const subject = target.subject.value;
    let number = parseInt(target.number.value);
    const title = target.title.value;
    const description = target.description.value;
    // const achievement = target.achievement.value;

    let achievements = [];
    if (target.diploma.checked) { achievements.push(target.diploma.value); }
    if (target.certificate.checked) { achievements.push(target.certificate.value); }

    // Set level based on course number
    let level = 0;
    if (number < 20) { level = 10; }
    else if (number < 30) { level = 20; }
    else if (number < 40) { level = 30; }
    console.log(subject, number, level, achievements);

    // Insert a course into the collection
    Meteor.call('courses.insert', subject, number, level, title, description, achievements);

    // Clear form
    target.subject.value = '';
    target.number.value = '';
    target.title.value = '';
    target.description.value = "";

    target.diploma.checked = false;
    target.certificate.checked = false;

    // Reset focus
    target.subject.focus();
  },
});
