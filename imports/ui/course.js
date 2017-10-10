import { Template } from 'meteor/templating';
import { Courses } from '../api/coursesDB.js';

import './course.html';

Template.course.events({
  'click .toggle-checked'() {
     console.log(this._id);
    Meteor.call('courses.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
    Meteor.call('courses.remove', this._id);
  }
});
