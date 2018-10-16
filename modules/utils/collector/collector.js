require('../../lib/ff');
Object.assign(global, ff);

const dbInfo = require('../../../config/db_info');

const uuid = require('uuid/v4');
const aws = require('aws-sdk');
aws.config.update({region: dbInfo.region});

const dynamoDB = new aws.DynamoDB.DocumentClient();

const {
    getPigTraceability, getPigButchery,
    getPigGrade, getPigPartGrade,
    getFarmDetailInfo, getFarmTotalInfo
} = require('../../../api/tracking_api');

/**
 * Test code
 * @description API data parsed json for using dynamoDB
 */

// go(getPigTraceability(),
//     a => a.pigNoInfo,
//     log);

go(getPigButchery(),
    a => a.message.returnValue.PigButcheryInfoDtlVo,
    log);

// go(getPigGrade(),
//     a => a.response.body.items.item,
//     log);

// go(getPigPartGrade(),
//     a => a.response.body.items.item,
//     log);

// go(getFarmDetailInfo(),
//     a => a.response.body.items.item,
//     log);

// go(getFarmTotalInfo(),
//     a => a.response.body.items.item,
//     log);


const params = {
    TableName: 'test',
    Item: {
        "uuid": uuid(),
        "id": "aaa",
        "pw": "bbb"
    }
};

// dynamoDB.put(params, (err, data) => {
//     (isUndefined(err)) ? error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2)) :
//         log("Added item:", JSON.stringify(data, null, 2));
// });