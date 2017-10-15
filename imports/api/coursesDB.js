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
    'courses.insert'(subject, number, level, title, achievement) {
        check(subject, String);
        check(number, Number);
        check(level, Number);
        check(title, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Courses.insert({
            subject,
            number,
            level,
            title,
            achievement,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            editOn: false,
        })
    },
    'courses.remove'(courseId) {
        check(courseId, String);

        Courses.remove(courseId);
    },
    'courses.edit'(courseId, editOn) {
        Courses.update(courseId, { $set: {editOn: !editOn} });
    },
    'courses.update'(courseId, subject, number, level, title, achievement, editOn) {
        check(subject, String);
        check(number, Number);
        check(level, Number);
        check(title, String);
        check(achievement, String);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Courses.update(courseId, { $set:
            {
                subject: subject,
                number: number,
                level: level,
                title: title,
                achievement: achievement,
                createdAt: new Date(),
                owner: Meteor.userId(),
                username: Meteor.user().username,
                editOn: editOn,
            }
        });
    }
});
