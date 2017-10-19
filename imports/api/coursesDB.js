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
    'courses.insert'(subject, number, level, title, description, achievement) {
        check(subject, String);
        check(number, Number);
        check(level, Number);
        check(title, String);
        check(description, String);
        check(achievement, [String]);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Courses.insert({
            subject,
            number,
            level,
            title,
            description,
            achievement,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            check: false,
            editOn: false,
            highlight: "no-highlight",
        })
    },
    'courses.remove'(courseId) {
        check(courseId, String);

        Courses.remove(courseId);
    },
    'courses.edit'(courseId, editOn) {
        Courses.update(courseId, { $set: {editOn: !editOn} });
    },
    'courses.update'(courseId, subject, number, level, title, description,
                    achievement, editOn) {
        check(subject, String);
        check(number, Number);
        check(level, Number);
        check(title, String);
        check(achievement, [String]);
        check(checked, Boolean);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Courses.update(courseId, { $set:
            {
                subject: subject,
                number: number,
                level: level,
                title: title,
                description: description,
                achievement: achievement,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username,
                editOn: editOn,
            }
        });
    },
    'courses.highlight'(courseId, type) {
        Courses.update(courseId, { $set: {highlight: type} });
    },
    'courses.check'(courseId, check) {
        Courses.update(courseId, { $set: {check: !check} });
    },
});
