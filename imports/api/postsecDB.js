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
    'postsecondary.insert'(school, program, achievement, req_single, req_cond) {
        check(school, String);
        check(program, String);
        check(achievement, String);
        check(req_single, [String]);
        check(req_cond, [[String]]);

        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        PostSecondary.insert({
            school,
            program,
            achievement,
            req_single,
            req_cond,
            createdAt: new Date(),
            owner: Meteor.userId(),
        })
    },
});