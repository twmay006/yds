<template lang="html">
    <span>
        <el-select v-model="id" placeholder="场馆列表" clearable @change="change" v-if="isMasterClub">
            <el-option
                v-for="item in clubList"
                :label="item.clubName"
                :value="item.id">
            </el-option>
        </el-select>
    </span>
</template>
<script>
export default {
    data() {
        return {
            id: this.value,
            clubList: '',
            isMasterClub: false
        }
    },
    watch: {
        value(val) {
            this.id = val || ''
        }
    },
    props: ['service', 'value'],
    methods: {
        change(e) {
            this.$parent.filters.clubId = e
        },
        render() {
            this.service.isMasterClub().then(res => {
                if (!res) return
                this.isMasterClub = res.flag
            })

            if (sessionStorage.getItem('clubList')) {
                this.clubList = JSON.parse(sessionStorage.getItem('clubList'))
                return
            }

            this.service.club().then(res => {
                if (!res) return
                this.clubList = res.data
                sessionStorage.setItem('clubList', JSON.stringify(this.clubList))
            })
        }
    },
    mounted() {
        this.render()
    }
}
</script>

<style lang="scss" scoped>
</style>
