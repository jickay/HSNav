import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const PostSecondary = new Mongo.Collection('postsecondary');

if (Meteor.isServer) {
    Meteor.publish('postsecondary', function postSecPub() {
        return PostSecondary.find();
    });
}

Meteor.methods({
    // Post Secondary
    'postsecondary.insert'(school, program, achievement, requirements) {
        check(school, String);
        check(program, String);
        check(achievement, String);
        check(requirements, [String]);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        PostSecondary.insert({
            school,
            program,
            achievement,
            requirements,
            createdAt: new Date(),
            owner: Meteor.userId(),
        })
    },
});