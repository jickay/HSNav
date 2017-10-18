import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Courses } from '../api/coursesDB.js';

import './course.html';
import './course.js';
import './body.html';
import './grid_header.html';
import './grid_row.html';
import './grid_cell.html';
import './edit_course.html';
import './edit_course.js';
import './course-form.html';
import './course-form.js';

var ACHIVEMENTS = ["Diploma", "Certificate"];
var GREY = 'rgb(230, 230, 230)';
var PINK = 'rgb(255, 192, 203)';
var ORANGE = 'rgb(255, 165, 0)';

Template.body.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
});

Template.body.helpers({
  courses() {
      return Courses.find({}, { sort: {subject: 1, number: 1, title: 1} });
  },
  gridSubjects() {
      return getDistinct("subject");
  },
  achievementLevel() {
      return ACHIVEMENTS;
  },
});

Template.body.events({
    'click #Diploma-btn'(event) {
        // toggleCourseHighlight(event.target.innerHTML, "diploma-on");
        toggleHighlight('#Diploma-btn', PINK, event.target.innerHTML, "diploma-on");
    },
    'click #Certificate-btn'(event) {
        // toggleCourseHighlight(event.target.innerHTML, "certificate-on");
        toggleHighlight('#Certificate-btn', ORANGE, event.target.innerHTML, "certificate-on");
    },
    // 'mouseleave .achievement-btn'(event) {
    //     var toHighlight = Courses.find({});
    //     toHighlight.forEach( function(x) {
    //         Meteor.call('courses.highlight', x._id, "no-highlight");
    //     });
    // }
});

Template.grid_cell.helpers({
    subjectCourses(currentSubject, currentLevel) {
        return Courses.find( { subject: currentSubject, level: currentLevel }  );
    },
});

Template.grid_cell.events({
    'mouseenter .course-btn'(event) {
        showCourseInfo(this.title, this.description);
    },
    'mouseleave .course-btn'(event) {
        showCourseInfo("<Mouse over a course>", "<Mouse over a course>");
    }
});

function getDistinct(keyword) {
    return _.uniq(_.pluck(Courses.find({}, { sort: {subject:1} }).fetch(), keyword));
}

function toggleHighlight(id, highlightColor, type, value) {
    var match = highlightColor;
    var color = $(id).css('background-color');
    if (color == match) {
        clearHighlights();
    } else {
        clearHighlights();
        $(id).css('background-color', match);
        toggleCourseHighlight(type, value);
    }
}

function toggleCourseHighlight(type, value) {
    var toHighlight = Courses.find({ achievement: type });
    toHighlight.forEach( function(x) {
        Meteor.call('courses.highlight', x._id, value);
    });
}

function clearHighlights() {
    $('.achievement-btn').css('background-color', GREY);
    var allCourses = Courses.find({})
    allCourses.forEach( function(x) {
        Meteor.call('courses.highlight', x._id, "no-highlight");
    });
}

function showCourseInfo(name, description) {
    $('#course-name').text("Course: " + name);
    $('#course-description').text("Description: " + description);
}
