import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Courses } from '../api/coursesDB.js';
import { Session } from 'meteor/session';

import './body.html';
import './grid_main.html';
import './grid_main.js';

import './admin.html';
import './admin.js';

import './users.html';
import './users.js';

Template.body.onCreated( function bodyOnCreated() {
    Meteor.subscribe('users');
    Session.setDefault("adminMode", false);
});

Template.body.helpers({
    adminModeOn() {
        return Session.get("adminMode");
    }
});

Template.body.events({
    'click .admin-btn'() {
        Session.set("adminMode", !Session.get("adminMode"));
    }
});


// Accounts.Meteor.onCreateUser(function(options, user) {
//     // if (user.username == "jickay") {
//     //     Meteor.users.update(user.userId, { $set: {admin: true} });
//     //     console.log(user.admin);
//     // }
//     return user
// });
