import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import './body.html';
import './grid/grid_main.html';
import './grid/grid_main.js';

import './admin/admin.html';
import './admin/admin.js';

Template.body.onCreated( function bodyOnCreated() {
    Meteor.subscribe('users');
    Session.setDefault("adminMode", false);
});

Template.body.helpers({
    checkAdmin() {
        if (Meteor.user().admin) { return true; }
    },
    adminModeOn() {
        return Session.get("adminMode");
    }
});

Template.body.events({
    'click .admin-btn'(event) {
        Session.set("adminMode", !Session.get("adminMode"));
        event.target.blur();
    }
});


// Accounts.Meteor.onCreateUser(function(options, user) {
//     // if (user.username == "jickay") {
//     //     Meteor.users.update(user.userId, { $set: {admin: true} });
//     //     console.log(user.admin);
//     // }
//     return user
// });
