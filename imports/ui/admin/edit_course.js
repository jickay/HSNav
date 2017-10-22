import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Courses } from '../../api/coursesDB.js';

import './edit_course.html';

Template.edit_course.helpers({
    isCert() {
        console.log(this.achievement);
        for (var i=0; i<this.achievement.length; i++) {
            if (this.achievement[i] == "Certificate") { return true; }
        }
    },
    isDiploma() {
        for (var i=0; i<this.achievement.length; i++) {
            if (this.achievement[i] == "Diploma") { return true; }
        }
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
        const description = target.description.value;
        // const achievement = target.achievement.value;

        var achievements = [];
        if (target.diploma.checked) { achievements.push(target.diploma.value); }
        if (target.certificate.checked) { achievements.push(target.certificate.value); }

        // Set level based on course number
        var level = 0;
        if (number < 20) { level = 10; }
        else if (number < 30) { level = 20; }
        else if (number < 40) { level = 30; }

        Meteor.call('courses.update', this._id, subject, number, level, title, description,
                                                achievements, !this.editOn);
    }
});
