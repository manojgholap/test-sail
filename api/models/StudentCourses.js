/**
 * StudentCourses.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
 
  attributes: {

    subject: {
      type: "string",
      required: true
    },
    type: {
      type: "string"
    },
    priority: {
      type: "string"
    },
    deadline: {
      type: 'string',
       columnType: 'date'
    },
    status: {
      type: "string"
    },
    studentId: {
      model:"student",
    },
  },

};

