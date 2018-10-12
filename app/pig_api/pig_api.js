// Base parameter
// apiKey=BbEDLMjiGJPYTgdKMume&userId=1101116559459

/** 보성녹돈 */
// 이력정보
// http://api.mtrace.go.kr/rest/pigTraceabilityInfo.json?apiKey=BbEDLMjiGJPYTgdKMume&userId=1101116559459&requestNo=2598800838&pigTraceabilityNo=160074101142

// 도축정보
// http://api.mtrace.go.kr/rest/pig/butchery/pigButcheryInfoDtl?apiKey=BbEDLMjiGJPYTgdKMume&userId=1101116559459&pigNo=160074101142

// 농장정보
// http://api.mtrace.go.kr/rest/pigFarmInfo.json?apiKey=BbELMjiGJPYTgdKMume&userId=1101116559459&requestNo=2598800838&farm_unique_no=600741D


const request = require('request');
const convert = require('xml-js');

const pigApiInfo = require('./pig_api_info');

const getPigButcheryInfoDtl = () => {
    const endPoint = `${pigApiInfo.host}${pigApiInfo.pigButcheryInfoDtl}?apiKey=BbEDLMjiGJPYTgdKMume&userId=1101116559459&pigNo=160074101142`;
    return get(endPoint);
};

const get = (endPoint) => new Promise((resolve, reject) => {
    request.get({
        url: endPoint
    }, (err, res, result) => (res.statusCode === 200) ? resolve(convert.xml2js(result, {compact: true, spaces: 4})) :
        (isUndefined(err) ? reject(JSON.parse(result)) : reject(err)));
});

module.exports = {
    getPigButcheryInfoDtl
}