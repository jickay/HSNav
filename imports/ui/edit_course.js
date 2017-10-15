import { Template } from 'meteor/templating';
import { Courses } from '../api/coursesDB.js';

import './edit_course.html';
import './course-form.html';

Template.edit_course.helpers({
    isDiploma(achievement) {
        if (achievement == "diploma") { return true; }
    },
    isCert(achievement) {
        if (achievement == "certificate") { return true; }
    }
});

Template.edit_course.events({
    'submit .edit-course'(event) {
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

        Meteor.call('courses.update', this._id, subject, number, level, title, achievement, !this.editOn);
    }
});
