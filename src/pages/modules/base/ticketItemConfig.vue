<template lang="html">
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class="content-wrapper">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane v-for="item in tabMapOptions" :label="item.label" :key='item.key' :name="item.key">
                    <keep-alive>
                        <component v-if='activeName == item.key' :is="activeName" :service="service"></component>
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ticketTab from './components/ticketTab'
import timeOutTab from './components/timeOutTab'
export default {
    data() {
        return {
            totalItems: 0,
            loading: true,
            tableData: [],
            dialog: false,
            data: {},
            activeName: 'ticketTab',
            tabMapOptions: [
                { label: '票券项目设置', key: 'ticketTab' },
                { label: '超时方案设置', key: 'timeOutTab' }
            ]
        }
    },
    components: { ticketTab, timeOutTab },
    props: ['service']
}
</script>
