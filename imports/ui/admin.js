import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Courses } from '../api/coursesDB.js';

import './admin.html';
import './course-form.html';
import './course-form.js';
import './edit_course.html';
import './edit_course.js';
import './course-listing.html';
import './course-listing.js';

Template.admin.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
});

Template.admin.helpers({
    getCourses() {
        return Courses.find({}, { sort: {subject: 1, number: 1, title: 1} });
    },
});
