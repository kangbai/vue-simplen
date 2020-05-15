<template>
    <div>
        <el-header class="zb_header">
            <div class="zb_header_t">
                <span>装逼系统.10</span>
                <span>
                    <i class="el-icon-user" /> 
                    <router-link class="zb_quit" to="/login">退出</router-link>
                </span>
            </div>
        </el-header>
        <el-container class="zb_container">
            <el-aside width="200px" background-color="#545c64">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    text-color="#fff"
                    default-active="1"
                    class="el-menu-vertical-demo"
                    :router="isMenuRouter"
                     @select="handleSelect"
                >
                    <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.name}}</span> 
                        </template>
                        <el-menu-item-group v-for="entry in item.children" :key="entry.id" >
                            <el-menu-item :index="entry.pagePath">{{entry.name}}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            isMenuRouter: false,
            menuList: [
                { id: '1', name: '角色模块', children: [ { name: '战士角色页', pagePath: '/warriorRole' }, { name: '刺客角色页',  pagePath: '/assassinRole'} ]  },
                { id: '2', name: '人员管理', children: [ { name: '凯', pagePath: '/kai' }, { name: '李白', pagePath: '/libai'} ]  }
            ]
        }
    },

    methods: {
        handleSelect (index) {
            this.$router.push(index)
        }
    }
}
</script>

<style>
.zb_header {
    background-color: #303133;
    color: #fff;
    line-height: 60px;
}
.zb_header_t {
    display: flex;
    justify-content: space-between;
}
.zb_container {
    height: calc(100vh - 60px);
}

.zb_quit {
    color: #fff;
    margin-left: 6px;
    cursor: pointer;
}

.el-menu-vertical-demo {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}
</style>