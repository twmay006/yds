<template lang='html'>
    <div>
        <!-- breadcrumb start  -->
        <v-breadcrumb></v-breadcrumb>
        <!-- breadcrumb end  -->
        <div class='content-wrapper'>
            <el-autocomplete v-model='state4' :props="{ label: 'haha' }" :fetch-suggestions='querySearchAsync' placeholder='请输入内容' @select='handleSelect'></el-autocomplete>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            restaurants: [],
            state4: '',
            timeout: null
        }
    },
    methods: {
        loadAll() {
            return [{
                'haha': '长'
            }, {
                'haha': '上海市长宁'
            }, {
                'haha': '上海市普陀区真北路988号创邑金沙谷6号楼113'
            }, {
                'haha': '8号'
            }]
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants,
                results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                cb(results)
            }, 1000 * Math.random())
        },
        createStateFilter(queryString) {
            return (state) => {
                console.log(state.haha.indexOf(queryString.toLowerCase()) === 0)
                return (state.haha.indexOf(queryString.toLowerCase()) === 0)
            }
        },
        handleSelect(item) {
            console.log(item)
        }
    },
    mounted() {
        this.restaurants = this.loadAll()
    }
}
</script>
