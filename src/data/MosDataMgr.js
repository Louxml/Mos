
// App数据
let App = {}

let MosDataMgr = {}

// 初始化
MosDataMgr.init = function(data){
    data;
}

// 获取App数据
MosDataMgr.getAppData = function(){
    return App.map(v => v)
}

// 初始化App数据
MosDataMgr.initAppData = function(data){
    for(let app of data){
        app.open = 0
    }
    App = data
}

export default MosDataMgr