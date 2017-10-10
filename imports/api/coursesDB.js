import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Courses = new Mongo.Collection('courses');

if (Meteor.isServer) {
    Meteor.publish('courses', function coursesPub() {
        return Courses.find();
    });
}

Meteor.methods({
    'courses.insert'(subject, number, level) {
        check(subject, String);
        check(number, Number);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Courses.insert({
            subject,
            number,
            level,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        })
    },
    'courses.remove'(courseId) {
        check(courseId, String);

        Courses.remove(courseId);
    },
});
