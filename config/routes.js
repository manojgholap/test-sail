/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'PATCH /student/:id':'StudentController.update',
  'POST /student':'StudentController.create',
  'POST /student/addTask':'StudentCoursesController.create',
  'POST /student/viewTask':'StudentCoursesController.getCoursesByStudentId',
  'GET /student':'StudentController.getAll',
  'GET /student/:id':'StudentController.getById',
  'DELETE /student/:id':'StudentController.deleteById',

//  user apis
  'POST /user/register':'UserController.register',
  'POST /user/login':'UserController.login',
  'POST /user/currentUser':'UserController.currentUser',
  

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
