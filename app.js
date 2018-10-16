require('./modules/lib/ff');
Object.assign(global, ff);

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB.DocumentClient();

const {
    getPigTraceability, getPigButchery,
    getPigGrade, getPigPartGrade,
    getFarmDetailInfo, getFarmTotalInfo } = require('./api/tracking_api');

const trackingApiInfo = require('./config/tracking_api_info');

api.get(`${trackingApiInfo.pig_traceability}`, () => {
    'use strict';
    return go(
        getPigTraceability());
});

api.get(`${trackingApiInfo.pig_butchery}`, () => {
    'use strict';
    return go(
        getPigButchery(), a => JSON.stringify(a));
});

api.get(`${trackingApiInfo.pig_grade}`, () => {
    'use strict';
    return go(
        getPigGrade(), a => JSON.stringify(a));
});

api.get(`${trackingApiInfo.pig_part_grade}`, () => {
    'use strict';
    return go(
        getPigPartGrade());
});

api.get(`${trackingApiInfo.farm_detail_info}`, () => {
    'use strict';
    return go(
        getFarmDetailInfo());
});

api.get(`${trackingApiInfo.farm_total_info}`, () => {
    'use strict';
    return go(
        getFarmTotalInfo());
});

module.exports = api;

/**
 * Test code
 * @description Test API data set on local
 */
// go(getPigButchery(), a => JSON.stringify(a), log);
// go(getFarmDetailInfo(), a => JSON.stringify(a), log);
// go(getPigTraceability(), a => JSON.stringify(a), log);
// go(getPigGrade(), a => JSON.stringify(a), log);
// go(getPigPartGrade(), a => JSON.stringify(a), log);
// go(getFarmTotalInfo(), log);

/**
 * Example code
 * @description Interface to dynamoDB
 */


// Create new user
// api.post('/user', (req) => {
//     'use strict';
//     const params = {
//         TableName: req.env.tableName,
//         Item: {
//             userid: req.body.userId,
//             name: req.body.name,
//             age: req.body.age
//         }
//     };
//     // return dynamo result directly
//     return dynamoDB.put(params).promise();
// }, { success: 201 }); // Return HTTP status 201 - Created when successful
//
// // get user for {id}
// api.get('/user/{id}', (req) => {
//     'use strict';
//     var id, params;
//     // Get the id from the pathParams
//     id = req.pathParams.id;
//     params = {
//         TableName: req.env.tableName,
//         Key: {
//             userid: id
//         }
//     };
//
//     // post-process dynamo result before returning
//     return dynamoDB.get(params).promise().then((response) => {
//         return response.Item;
//     });
// });
//
// // delete user with {id}
// api.delete('/user/{id}', (req) => {
//     'use strict';
//     var id, params;
//     // Get the id from the pathParams
//     id = req.pathParams.id;
//     params = {
//         TableName: req.env.tableName,
//         Key: {
//             userid: id
//         }
//     };
//     // return a completely different result when dynamo completes
//     return dynamoDB.delete(params).promise()
//         .then(() => {
//             return 'Deleted user with id "' + id + '"';
//         });
// }, {success: { contentType: 'text/plain'}});

// api.addPostDeployConfig('tableName', 'DynamoDB Table Name:', 'configure-db');
