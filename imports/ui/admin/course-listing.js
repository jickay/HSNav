import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Courses } from '../../api/coursesDB.js';

import './course-listing.html';

Template.course_listing.events({
  'click .edit'() {
    Meteor.call('courses.edit', this._id, this.editOn);
  },
  'click .delete'() {
    Meteor.call('courses.remove', this._id);
  }
});
