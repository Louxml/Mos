<template>
    <div class="Apps">
        <app-icon v-for="(item, index) in app_list" :key="index" 
            :id="index" 
            :icon="item.icon?config.APP_ROUTE + item.app + '/' + item.icon:config.APP_ICON" 
            :name="item.name" 
            @open-box="openBox"
        />
    </div>
    <div class="Boxs" :class="{drag:drag_id >= 0}" @mousemove="dragBoxMove" @mouseup="mouseUp">
        <app-box v-for="(item, index) in box_list" :key="item.app" 
            :id="index" 
            :active="active_id == index"
            :drag="drag_id == index"
            :route="config.APP_ROUTE + item.app + '/' + item.enter" 
            :name="item.name" 
            :width="item.width" 
            :height="item.height" 
            :x="item.x" 
            :y="item.y" 
            @close-box="closeBox"
            @active-box="activeBox"
            @drag-box="dragBox"
        />
    </div>
</template>

<script>
// 数据
import { GetAppList } from '../../api/desktop'
import MosDataMgr from '../../data/MosDataMgr'
import DesktopConfig from '../../../config/Desktop.config'

// 组件
import AppIcon from './AppIcon.vue'
import AppBox from '../AppBox/AppBox.vue'

export default {
    name: "Mos-App-Desktop",
    components:{
        AppIcon,
        AppBox
    },
    data(){
        return {
            app_list:[],
            box_list:[],
            active_id:-1,
            drag_id:-1,
            drag_x:0,
            drag_y:0,
            config:DesktopConfig
        }
    },
    mounted(){
        this.getAppList()
    },
    methods:{
        // 获取App列表
        getAppList:function(){
            GetAppList()
            .then(res => {
                if(!res) return Promise.reject("Data Error!");
                // 设置App数据
                MosDataMgr.initAppData(res)
                this.app_list = MosDataMgr.getAppData()
            })
            .catch(e => {
                console.error(e)
            })
        },
        openBox:function(id){
            let app = this.app_list[id]
            if(app.only && app.open > 0)return
            app.open++
            app.x = this.config.APP_BOX_POS_X
            app.y = this.config.APP_BOX_POS_Y - app.height/2
            this.box_list.push(app)
            this.active_id = this.box_list.length - 1
        },
        closeBox:function(id){
            if(id != this.active_id)console.error("AppBox Index Error!");
            let app = this.box_list.pop()
            app.open--;
            this.active_id = this.box_list.length - 1
        },
        dragBox:function(e){
            this.drag_id = e.id
            this.drag_x = e.x
            this.drag_y = e.y
        },
        dragBoxMove:function(e){
            if(this.drag_id < 0)return;
            this.box_list[this.drag_id].x = e.clientX - this.drag_x;
            this.box_list[this.drag_id].y = e.clientY - this.drag_y;
        },
        mouseUp:function(){
            this.drag_id = -1;
            this.drag_x = 0;
            this.drag_y= 0;
        },
        activeBox:function(id){
            if(id == this.active_id)return
            let list = this.box_list
            let t = list[id]
            list[id] = list[this.active_id]
            list[this.active_id] = t
            this.box_list = list
            this.active_id = this.box_list.length - 1
        }
    }
}
</script>

<style scoped>
.Apps{
    position:absolute;
    width:100%;
	height:100%;
    padding:10px;
    box-sizing: border-box;

    display: grid;
    grid-gap: 10px;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fill, 120px);
    grid-template-rows: repeat(auto-fill, 120px);
    pointer-events: none;
    z-index:1;
}
.Boxs{
    position:absolute;
    width:100%;
	height:100%;
    padding:10px;
    box-sizing: border-box;
    pointer-events: none;
    z-index:1;
}
.Boxs.drag{
    pointer-events: auto;
}
</style>