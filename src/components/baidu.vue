<template lang="html">
    <div>
        <baidu-map
            class="bm-view"
            :center="{lng: 116.404, lat: 39.915}"
            :zoom="15"
            :scroll-wheel-zoom="true"
            ak="d52hY7bG3PUGHZBlBe7xYsgc2FdA1Rrv"
            >
            <bm-local-search :keyword="keyword"  :auto-viewport="true" @resultshtmlset="resultshtmlset" @searchcomplete="searchcomplete"></bm-local-search>
        </baidu-map>
        <slot name='tip'></slot>
    </div>
</template>

<script>
import { BaiduMap, BmMarker, BmLocalSearch } from 'vue-baidu-map'
export default {
    data() {
        return {
            // position: { lng: 116.404, lat: 39.915 },
            // location: '北京',
            // keyword: '北京'
        }
    },
    props: ['keyword'],
    components: {
        BaiduMap,
        BmMarker,
        BmLocalSearch
    },
    methods: {
        resultshtmlset(e) {
            // console.log(e)
        },
        searchcomplete(e) {
            // console.log(e)
        }
    },
    mounted() {
        // console.log(this.keyword)
    }
}
</script>

<style lang="scss" scoped>
.bm-view {
    width: 100%;
    height: 300px;
    & > div:nth-child(2){
        height: 0;
        overflow: hidden;
    }
}
.tip{
    padding: 20px 0;
    display: block;
}
</style>
