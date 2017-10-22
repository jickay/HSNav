import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';

import './users.html';

Template.users.onCreated( function bodyOnCreated() {
    Meteor.subscribe('users');
});

Template.users.helpers({
    getUsers() {
        return Meteor.users.find();
    }
});
