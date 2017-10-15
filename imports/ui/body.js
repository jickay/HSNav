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

Template.body.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('courses');
});

Template.body.helpers({
  courses() {
      const instance = Template.instance();
      if (instance.state.get('hideCompleted')) {
          return Courses.find({ checked: { $ne: true } }, { sort: { subject: 1, number: 1} });
      }
      return Courses.find({}, { sort: {subject: 1, number: 1} });
  },
  gridSubjects() {
      return getDistinct("subject");
  },
});

Template.grid_cell.helpers({
    subjectCourses(currentSubject, currentLevel) {
        return Courses.find( { subject: currentSubject, level: currentLevel }  );
    }
});

Template.course_form.events({
  'submit .course-form'(event, editOn) {
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
  },
});

function getDistinct(subject) {
    return _.uniq(_.pluck(Courses.find().fetch(), subject));
}
