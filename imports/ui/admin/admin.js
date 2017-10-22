import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Courses } from '../../api/coursesDB.js';
import { Session } from 'meteor/session';

import './admin.html';
import './course-form.html';
import './course-form.js';
import './edit_course.html';
import './edit_course.js';
import './course-listing.html';
import './course-listing.js';

import './users.html';
import './users.js';

import './post-sec.html';
import './post-sec.js';

Template.admin.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
    Session.set("tab", "courses");
});

Template.admin.helpers({
    getCourses() {
        return Courses.find({}, { sort: {subject: 1, number: 1, title: 1} });
    },
    onCourses() {
        if (Session.get("tab") === "courses") { return true; }
    },
    onUsers() {
        if (Session.get("tab") === "users") { return true; }
    },
    onPostSec() {
        console.log(Session.get("tab"));
        if (Session.get("tab") === "postsec") { return true; }
    },
});

Template.admin.events({
    'click .courses-tab'() {
        Session.set("tab", "courses");
    },
    'click .users-tab'() {
        Session.set("tab", "users");
    },
    'click .postsec-tab'() {
        Session.set("tab", "postsec");
    }
})
