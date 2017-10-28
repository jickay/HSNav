import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { PostSecondary } from "../../api/postsecDB";
import { Session } from 'meteor/session';

import './post-sec.html';
import './post-sec-cond.html';
import './post-sec-listing.html';

Template.post_secondary.onCreated( function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('postsecondary');
    Session.set("count",[1]);
});

Template.post_secondary.helpers({
   condCount() {
       return Session.get("count");
   }
});

Template.post_sec_listing.helpers({
    getPostSec() {
        return PostSecondary.find();
    }
});

Template.post_secondary.events({
    'click #add_cond'() {
        let arr = Session.get("count");
        arr.push(1);
        Session.set("count", arr);
    },
   'submit .postsec-form'(event) {
       // Prevent default browser form submit
       event.preventDefault();

       // Get value from form element
       const target = event.target;
       const school = target.school.value;
       const program = target.program.value;
       const degree = target.degree.value;

       const reqSingle = parseCourseString(target.req_single.value);
       console.log(reqSingle);

       const reqCond = condValues(target);
       console.log(condValues(target));

       // Insert a course into the collection
       Meteor.call('postsecondary.insert', school, program, degree, reqSingle, reqCond);

       // Clear form
       target.school.value = '';
       target.program.value = '';
       target.degree.value = '';
       target.req_single.value = '';
       $(target.cond_number).each(function(){ this.value = ""; });
       $(target.cond_courses).each(function(){ this.value = ""; });

       // Reset focus
       target.school.focus();
   },
});

function parseCourseString(courseString) {
    const courses = courseString.split(",");
    for (let i=0; i<courses.length; i++) {
        courses[i] = courses[i].replace(/\s/g, "");
    }
    return courses;
}

function condValues(target) {
    const allCond = [];
    const ops = [];
    const nums = [];
    const courses = [];

    $(target.cond_op).each(function() { ops.push(this.value); });
    $(target.cond_number).each(function() { nums.push(this.value); });
    $(target.cond_courses).each(function() { courses.push(this.value); });

    for (let i=0; i<ops.length; i++) {
        const cond = [];
        cond.push(ops[i], nums[i], courses[i]);
        allCond.push(cond);
    }

    return allCond;
}