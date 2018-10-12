require('./modules/lib/ff');
Object.assign(global, ff);

const { getPigButcheryInfoDtl } = require('./app/pig_api/pig_api');
const pigApiInfo = require('./app/pig_api/pig_api_info');

const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

api.get(`${pigApiInfo.pigButcheryInfoDtl}`, () => {
    'use strict';
    return go(
        getPigButcheryInfoDtl(),
        a => `<div>a</div>`);
});

go(getPigButcheryInfoDtl(), log);

api.get('/test', () => {
    'use strict';
    return 'hello Test';
});

api.post('/hello', (request) => {
    'use strict';
    return request;
});

module.exports = api;