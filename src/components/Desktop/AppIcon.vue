<template>
    <div class="icon" @click="openBox">
        <img :src="icon" :alt="name">
        <span>{{name}}</span>
    </div>
</template>

<script>
export default {
    name: "Mos-AppIcon",
    props:{
        id:{
            type:Number,
            default:-1
        },
        icon:{
            type:String,
            default:''
        },
        name:{
            type:String,
            default:''
        },
    },
    methods:{
        openBox:function(){
            console.log(this.id)
            this.$emit("OpenBox", this.id)
        }
    }
}
</script>

<style scoped>
.icon{
    position: relative;
    width:120px;
    height:120px;
    border-radius:0px;
    pointer-events: auto;
    transition: all .2s;
}
.icon > img{
    position:absolute;
    transform:translate(-50%, -50%);
    top:50%;
    left:50%;

    display: block;
    width: 80px;
    height: 80px;
    border-radius: 10px;
    z-index:1;
    transition: all .2s;
}
.icon > span{
    position:absolute;
    transform:translate(-50%, -50%);
    top:calc(50% + 30px);
    left:50%;

    display: block;
    width: 100%;
    height: 30px;
    text-align: center;
    color: #fff;
    font-size: 12pt;
    font-weight: 400;
    cursor: pointer;
    opacity:0;
    transition: all .2s;
}

.icon:hover{
    border-radius:16px;
    background-color:#fff2;
}

.icon:hover > img{
    top:calc(50% - 10px);

    width: 64px;
    height: 64px;
}
.icon:hover > span{
    opacity:1;
    top:calc(50% + 40px);
}
</style>