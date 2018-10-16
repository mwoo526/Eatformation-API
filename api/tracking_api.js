const request = require('request');
const parser = require('fast-xml-parser');

const trackingApiInfo = require('../config/tracking_api_info');

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/rest/pigTraceabilityInfo.xml
const getPigTraceability = () => {
    const endPoint = trackingApiInfo.host_mtrace + trackingApiInfo.pig_traceability;
    const qs = {
        apiKey: trackingApiInfo.api_key,
        userId: trackingApiInfo.user_id,
        pigTraceabilityNo: '160074101142'
    };

    return get(endPoint, qs);
}

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/rest/pig/butchery/pigButcheryInfoDtl
const getPigButchery = () => {
    const endPoint = trackingApiInfo.host_mtrace + trackingApiInfo.pig_butchery;
    const qs = {
        apiKey: trackingApiInfo.api_key,
        userId: trackingApiInfo.user_id,
        pigNo: '160074101142'
    };

    return get(endPoint, qs);
};

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/openapi-data/service/user/grade/confirm/pig
const getPigGrade = () => {
    // const endPoint = trackingApiInfo.host_ekape + trackingApiInfo.pig_grade;
    const endPoint = trackingApiInfo.host_ekape + trackingApiInfo.pig_grade + `?ServiceKey=${trackingApiInfo.service_key}`;
    const qs = {
        issueNo: '0817-10020016',
        issueDate: '2018-10-02'
        // ServiceKey: trackingApiInfo.service_key
    };

    return get(endPoint, qs);
}

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/openapi-data/service/user/grade/confirm/pigPart
const getPigPartGrade  = () => {
    // const endPoint = trackingApiInfo.host_ekape + trackingApiInfo.pig_part_grade;
    const endPoint = trackingApiInfo.host_ekape + trackingApiInfo.pig_part_grade + `?ServiceKey=${trackingApiInfo.service_key}`;
    const qs = {
        issueNo: '0817-10020016',
        issueDate: '2018-10-02'
        // ServiceKey: trackingApiInfo.service_key
    };

    return get(endPoint, qs);
}

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/1543000/FarmServiceInfo/getFarmAreaInfo
const getFarmDetailInfo  = () => {
    const endPoint = trackingApiInfo.host_data + trackingApiInfo.farm_detail_info + `?serviceKey=${trackingApiInfo.service_key}`;
    const qs = {
        pageNo: 1,
        startPage: 1,
        numOfRows: 10,
        pageSize: 10
        // ServiceKey: trackingApiInfo.service_key
    };

    return get(endPoint, qs);
}

// https://zfhwg0i742.execute-api.ap-northeast-2.amazonaws.com/latest/1543000/FarmService/getFarmAreaStatInfo
const getFarmTotalInfo = () => {
    const endPoint = trackingApiInfo.host_data + trackingApiInfo.farm_total_info + `?serviceKey=${trackingApiInfo.service_key}`;
    const qs = {
        pageNo: 1,
        startPage: 1,
        numOfRows: 10,
        pageSize: 10
        // ServiceKey: trackingApiInfo.service_key
    };

    return get(endPoint, qs);
}

/**
 * Request npm module [ get, post ]
 * @param endPoint
 * @param qs
 * @returns {Promise<any>}
 */
const get = (endPoint, qs) => new Promise((resolve, reject) => {
    request.get({
        url: endPoint,
        qs: qs
    }, (err, res, result) => (res.statusCode === 200) ? resolve(parser.parse(result)) :
        (isUndefined(err) ? reject(JSON.parse(result)) : reject(err)));
});

const post = (endPoint, header, body) => new Promise((resolve, reject) => {
    request.post({
        url: endPoint,
        headers: header,
        body: JSON.stringify(body)
    }, (err, res, result) => (res.statusCode === 200) ? resolve(JSON.parse(result)) :
        (isUndefined(err) ? reject(JSON.parse(result)) : reject(err)));
});

module.exports = {
    getPigTraceability, getPigButchery,
    getPigGrade, getPigPartGrade,
    getFarmDetailInfo, getFarmTotalInfo
}