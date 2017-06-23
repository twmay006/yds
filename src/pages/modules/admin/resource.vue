<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <!-- filters start -->
            <div class="filters">
                <div class="filter">
                    <el-button type="primary" icon="plus" @click="newAdd">新增</el-button>
                    <el-button type="danger" icon="delete" @click="batchDelete">删除</el-button>
                </div>
            </div>
            <!-- filters end -->
            <el-row :gutter="40" >
                <el-col :span="10">
                    <el-tabs>
                        <el-tab-pane label="菜单树" ></el-tab-pane>
                    </el-tabs>
                    <div>
                        <el-tree
                            ref="resourceTree"
                            :data="resourceTree"
                            show-checkbox
                            highlight-current
                            :expand-on-click-node="false"
                            :render-content="renderContent"
                            @node-click="handleNodeClick" clearable node-key="id" :props="defaultProps">
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="14">
                    <el-tabs>
                        <el-tab-pane label="配置菜单" ></el-tab-pane>
                    </el-tabs>
                    <div>
                        <el-row :gutter="40" >
                            <el-col :span="15">
                                <v-form name="form" @on-submit="onSubmit" @on-fail="onSubmit" :items="formRule" :data="data"  :loadding="loadding">
                                </v-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import tree from '@/utils/tree'
// import merge from 'element-ui/src/utils/merge'

export default {
    mixins: [tree],
    data() {
        return {
            formRule: {
                // parent: {
                //     type: 'input',
                //     label: '父级',
                //     value: '',
                //     rules: ['required']
                // },
                name: {
                    type: 'input',
                    label: '名称',
                    value: '',
                    rules: ['required', 'Cn']
                }
                // ,
                // link: {
                //     type: 'input',
                //     label: '链接',
                //     value: '',
                //     rules: ['required', 'email']
                // },
                // phone: {
                //     type: 'input',
                //     label: '手机',
                //     value: '',
                //     rules: ['required', 'phone', 'number']
                // },
                // isShow: {
                //     type: 'checkbox',
                //     label: '是否显示',
                //     rules: ['array'],
                //     value: [],
                //     options: [{
                //         label: '显示',
                //         value: 1
                //     }, {
                //         label: '显示',
                //         value: 2
                //     }]
                // }
            },
            loadding: false,
            data: {},
            resourceTree: [
                { id: 52, parentId: null, sort: 0, name: '登录', code: '/login', type: 3, usable: '1', remarks: '', children: [] },
                { id: 68, parentId: null, sort: 0, name: '仪表盘', code: '/index', type: 1, usable: '1', remarks: '', children: [] },
                {
                    id: 69,
                    parentId: null,
                    sort: 0,
                    name: '系统管理',
                    code: '/sys',
                    type: 1,
                    usable: '1',
                    remarks: '',
                    children: [{
                        id: 82,
                        parentId: 69,
                        sort: 0,
                        name: '资源管理',
                        code: '/sys/resource',
                        type: 1,
                        usable: '1',
                        remarks: '',
                        children: [{ id: 99, parentId: 82, sort: 0, name: '/sys/resource/get', code: '/sys/resource/get', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 100, parentId: 82, sort: 0, name: '/sys/resource/update', code: '/sys/resource/update', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 101, parentId: 82, sort: 0, name: '/sys/resource/delete', code: '/sys/resource/delete', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 102, parentId: 82, sort: 0, name: '/sys/resource/add', code: '/sys/resource/add', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 103, parentId: 82, sort: 0, name: '/sys/resource/page', code: '/sys/resource/page', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 104, parentId: 82, sort: 0, name: '/sys/resource/list', code: '/sys/resource/list', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 105, parentId: 82, sort: 0, name: '/sys/resource/list2', code: '/sys/resource/list2', type: 3, usable: '1', remarks: '', children: [] }
                        ]
                    }, {
                        id: 70,
                        parentId: 69,
                        sort: 1,
                        name: '菜单管理',
                        code: '/sys/menuList',
                        type: 1,
                        usable: '1',
                        remarks: '',
                        children: [{ id: 83, parentId: 70, sort: 0, name: '/sys/menu/get', code: '/sys/menu/get', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 84, parentId: 70, sort: 0, name: '/sys/menu/update', code: '/sys/menu/update', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 85, parentId: 70, sort: 0, name: '/sys/menu/delete', code: '/sys/menu/delete', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 86, parentId: 70, sort: 0, name: '/sys/menu/add', code: '/sys/menu/add', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 87, parentId: 70, sort: 0, name: '/sys/menu/page', code: '/sys/menu/page', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 88, parentId: 70, sort: 0, name: '/sys/menu/list', code: '/sys/menu/list', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 89, parentId: 70, sort: 0, name: '/sys/menu/list2', code: '/sys/menu/list2', type: 3, usable: '1', remarks: '', children: [] }
                        ]
                    }, {
                        id: 71,
                        parentId: 69,
                        sort: 3,
                        name: '角色管理',
                        code: '/sys/roleList',
                        type: 1,
                        usable: '1',
                        remarks: '',
                        children: [{ id: 90, parentId: 71, sort: 0, name: '/sys/role/get', code: '/sys/role/get', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 91, parentId: 71, sort: 0, name: '/sys/role/update', code: '/sys/role/update', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 92, parentId: 71, sort: 0, name: '/sys/role/delete', code: '/sys/role/delete', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 93, parentId: 71, sort: 0, name: '/sys/role/add', code: '/sys/role/add', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 94, parentId: 71, sort: 0, name: '/sys/role/page', code: '/sys/role/page', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 95, parentId: 71, sort: 0, name: '/sys/role/list', code: '/sys/role/list', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 96, parentId: 71, sort: 0, name: '/sys/role/list2', code: '/sys/role/list2', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 97, parentId: 71, sort: 0, name: '/sys/role/resources', code: '/sys/role/resources', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 98, parentId: 71, sort: 0, name: '/sys/role/setResources', code: '/sys/role/setResources', type: 3, usable: '1', remarks: '', children: [] }
                        ]
                    }, {
                        id: 72,
                        parentId: 69,
                        sort: 6,
                        name: '用户管理',
                        code: '/sys/userList',
                        type: 1,
                        usable: '1',
                        remarks: '',
                        children: [{ id: 106, parentId: 72, sort: 0, name: '/sys/user/get', code: '/sys/user/get', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 107, parentId: 72, sort: 0, name: '/sys/user/add', code: '/sys/user/add', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 108, parentId: 72, sort: 0, name: '/sys/user/update', code: '/sys/user/update', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 109, parentId: 72, sort: 0, name: '/sys/user/delete', code: '/sys/user/delete', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 110, parentId: 72, sort: 0, name: '/sys/user/page', code: '/sys/user/page', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 111, parentId: 72, sort: 0, name: '/sys/user/roleIds', code: '/sys/user/roleIds', type: 3, usable: '1', remarks: '', children: [] },
                            { id: 112, parentId: 72, sort: 0, name: '/sys/user/setRoles', code: '/sys/user/setRoles', type: 3, usable: '1', remarks: '', children: [] }
                        ]
                    }]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'name',
                id: 'id'
            }
        }
    },
    methods: {
        newAdd() {
            this.form = {
                id: null,
                parentId: null,
                name: '',
                code: '',
                type: 1,
                sort: 0,
                usable: '1',
                remarks: ''
            }
        },
        renderContent(h, { node, data, store }) {
            return (
                    <span>
                            <span>
                                    <span>{node.label}</span>
                            </span>
                    </span>)
        },
        deleteSelected() {
        },
        batchDelete() {
            var checkKeys = this.$refs.resourceTree.getCheckedKeys()
            if (checkKeys == null || checkKeys.length <= 0) {
                this.$message.warning('请选择要删除的资源')
                return
            }
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // console.log(checkKeys.join(','))
            })
        },
        handleNodeClick(data) {
            this.data = data
            // console.log(data)
            // console.log(merge({}, data))
            // this.form = merge({}, data)
        },
        onSubmit() {
            if (this.data.id == null) {
                // console.log(this.data)
            }
            else {
                // console.log(this.data)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    /* .border{
        >div{
            border: 1px solid #d1dbe5;
            border-radius: 4px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
        }
    } */
</style>
