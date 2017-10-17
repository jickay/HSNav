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

var buttonType;

Template.body.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
});

Template.body.helpers({
  courses() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
          return Courses.find({}, { sort: { subject: 1, number: 1, title: 1, editOn: 1} });
      }
      return Courses.find({}, { sort: {subject: 1, number: 1} });
  },
  gridSubjects() {
      return getDistinct("subject");
  },
  achievementLevel() {
      var levels = getDistinct("achievement");
      for (var i=0; i<levels.length; i++) {
          if (levels[i] == "None") { delete levels[i]; }
      }
      return levels;
  },
});

Template.body.events({
    'mouseenter #Diploma-btn'(event) {
        var toHighlight = Courses.find({ achievement: "Diploma" });
        toHighlight.forEach( function(x) {
            Meteor.call('courses.highlight', x._id, "diploma-on");
        });
    },
    'mouseenter #Certificate-btn'(event) {
        var toHighlight = Courses.find({ achievement: "Certificate" });
        toHighlight.forEach( function(x) {
            Meteor.call('courses.highlight', x._id, "certificate-on");
        });
    },
    'mouseleave .achivement-btn'(event) {
        var toHighlight = Courses.find({});
        toHighlight.forEach( function(x) {
            Meteor.call('courses.highlight', x._id, "no-highlight");
        });
    }
});

Template.grid_cell.helpers({
    subjectCourses(currentSubject, currentLevel) {
        return Courses.find( { subject: currentSubject, level: currentLevel }  );
    },
});

function getDistinct(keyword) {
    return _.uniq(_.pluck(Courses.find().fetch(), keyword));
}
