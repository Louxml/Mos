let url = require('./config')
let axios = require('axios')


function GetAppList(){
    return axios.post(url.getAppList, {})
    .then(res => res.data);
}

module.exports = {
    GetAppList
}