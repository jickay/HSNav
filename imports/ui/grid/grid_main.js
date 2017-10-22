import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Courses } from '../../api/coursesDB.js';
import { Session } from 'meteor/session';

import './grid_main.html';
import './grid_header.html';
import './grid_row.html';
import './grid_cell.html';

var ACHIVEMENTS = ["Diploma", "Certificate"];
var GREY = 'rgb(230, 230, 230)';
var PINK = 'rgb(255, 192, 203)';
var ORANGE = 'rgb(255, 165, 0)';

Template.grid_main.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
    Session.set("diplomaOn", false);
    Session.set("certOn", false);
});

Template.grid_main.helpers({
    gridSubjects() {
        console.log(getDistinct("subject"));
        return getDistinct("subject");
    },
    achievementLevel() {
        return ACHIVEMENTS;
    },
    diplomaOn() {
      if (Session.get("diplomaOn")) { return true; }
    },
    certOn() {
        if (Session.get("certOn")) { return true; }
    }
});

Template.grid_main.events({
    'click #Diploma-btn'(event) {
        Session.set("diplomaOn", !Session.get("diplomaOn"));
        var dipOn = Session.get("diplomaOn");
        if (dipOn) { Session.set("certOn", false); }
        toggleHighlight(dipOn, event.target.innerHTML, "diploma-on");
    },
    'click #Certificate-btn'(event) {
        Session.set("certOn", !Session.get("certOn"));
        var certOn = Session.get("certOn");
        if (certOn) { Session.set("diplomaOn", false); }
        toggleHighlight(certOn, event.target.innerHTML, "certificate-on");
    },
    // 'mouseleave .achievement-btn'(event) {
    //     var toHighlight = Courses.find({});
    //     toHighlight.forEach( function(x) {
    //         Meteor.call('courses.highlight', x._id, "no-highlight");
    //     });
    // }
});

Template.grid_row.helpers({
    evenRow(index) {
        if (index %2 === 0) { return true; }
    }
});


Template.grid_cell.helpers({
    subjectCourses(currentSubject, currentLevel) {
        return Courses.find( { subject: currentSubject, level: currentLevel }  );
    },
});

Template.grid_cell.events({
    'mouseenter .course-btn-group'(event) {
        showCourseInfo(this.title, this.description);
    },
    'mouseleave .course-btn-group'(event) {
        showCourseInfo("<Mouse over a course>", "<Mouse over a course>");
    },
    'click .course-check-btn'(event) {
        Meteor.call('courses.check', this._id, this.check);
        event.target.blur();
    }
});

function getDistinct(keyword) {
    return _.uniq(_.pluck(Courses.find({}, { sort: {subject:1} }).fetch(), keyword));
}

function toggleHighlight(checkOn, type, value) {
    if (checkOn) {
        clearHighlights();
        toggleCourseHighlight(type, value);
    } else {
        clearHighlights();
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
