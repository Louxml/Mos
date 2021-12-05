<template>
    <div class="Box" :class="{active:active, min:min_state, drag:drag}" :style="{
        width:width + 'px',
        height:min_state?0:height + 'px',
        top:y + 'px',
        left:x + 'px'
    }" @mousedown.capture="activeBox">
        <div class="header">
            <div class="left" @click="minBox"></div>
            <div class="right" @click="closeBox"></div>
            <span class="app-box-title" @mousedown="dragBox">{{name}}</span>
        </div>
        <div class="body">
            <iframe :src="route"></iframe>
        </div>
    </div>
</template>

<script>
export default {
    name: "Mos-App-Box",
    props:{
        id:{
            type:Number,
            default:-1
        },
        active:{
            type:Boolean,
            default:false
        },
        drag:{
            type:Boolean,
            default:false
        },
        min:{
            type:Boolean,
            default:false
        },
        route:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:''
        },
        width:{
            type:Number,
            default:0
        },
        height:{
            type:Number,
            default:0
        },
        x:{
            type:Number,
            default:0
        },
        y:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            min_state:this.min,
        }
    },
    methods:{
        minBox:function(){
            this.min_state = !this.min_state
        },
        closeBox:function(){
            this.$emit("CloseBox", this.id)
        },
        activeBox:function(){
            this.$emit("ActiveBox", this.id)
        },
        dragBox:function(e){
            this.$emit("DragBox", {id:this.id, x:e.clientX - this.x, y:e.clientY - this.y})
        }
    }
}
</script>

<style scoped>
.Box{
    position: absolute;
    transform:translate(-50%, 0%);
    top: 0;
    left: 0;
    padding-top: 30px;
    overflow: visible;
    pointer-events: auto;
    background: #fff0;
    transition-property: height;
    transition-duration: 1s;
    opacity:0.5;
}
.Box.active{
    opacity: 1;
}
.Box.min{
    height:0px;
}
.Box > .header{
    position: relative;
    width: 100%;
    height: 30px;
    margin-top: -30px;
}
.Box > .header > .left,
.Box > .header > .right{
    display: block;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background: #f66;
    transition: left .2s;
    cursor: pointer;
}
.Box.min > .header > .left::before {
    width: 10px;
}
.Box.min > .header > .left::before {
    content: "";
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 10px;
    height: 6px;
    border: 2px solid #fff;
    border-radius: 2px;
    background: transparent;
    transition: all .4s;
}
.Box > .header:hover > .left{
    left: calc(50% - 66px);
}
.Box > .header:hover > .left::before {
    width: 12px;
}
.Box > .header:hover > .right{
    left: calc(50% + 66px);
}
.Box > .header:hover > .right::before {
    transform: translate(-50%,-50%) rotate(-45deg);
}
.Box > .header:hover > .right::after {
    transform: translate(-50%,-50%) rotate(45deg);
}
.Box > .header > .left::before{
    content: "";
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 0px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    transition: all .4s;
}
.Box > .header > .right::before{
    content: "";
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    transition: all .4s;
}
.Box > .header > .right::after{
    content: "";
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 16px;
    height: 2px;
    border-radius: 2px;
    background: #fff;
    transition: all .4s;
}
.Box > .header > span.app-box-title{
    display: block;
    position: absolute;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    width: 100px;
    height: 24px;
    border-radius: 12px;
    background: #f66;
    cursor: grab;
    color: #fff;
    text-align: center;
    font-size: 10pt;
    line-height: 24px;
}
.Box.drag > .header > span.app-box-title{
    cursor:grabbing;
}
.Box > .body,
.Box > .body > iframe{
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
}
.Box > .body::after{
    position:absolute;
    content: "";
    width:100%;
    height:100%;
    top:0;
    left:0;
}
.Box.active > .body::after{
    display: none;
}
.Box.drag > .body::after{
    display: block;
}
</style>