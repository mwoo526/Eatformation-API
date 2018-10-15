require('./modules/lib/ff');
Object.assign(global, ff);

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();
const aws = require('aws-sdk');
const dynamoDB = new aws.DynamoDB.DocumentClient();

const {
    getPigTraceability, getPigButchery,
    getPigGrade, getPigPartGrade,
    getFarmDetailInfo, getFarmTotalInfo } = require('./app/api/tracking_api');

const trackingApiInfo = require('./app/api/config/tracking_api_info');

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

// go(getPigButchery(), a => JSON.stringify(a), log);
// go(getFarmTotalInfo(), a => JSON.stringify(a), log);
// go(getFarmDetailInfo(), a => JSON.stringify(a), log);
// go(getPigTraceability(), a => JSON.stringify(a), log);
// go(getPigGrade(), a => JSON.stringify(a), log);
// go(getPigPartGrade(), a => JSON.stringify(a), log);

module.exports = api;



api.addPostDeployConfig('tableName', 'DynamoDB Table Name:', 'configure-db');
