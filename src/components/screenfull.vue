<template>
    <i class="fa fa-arrows">
        <svg @click='click' class="screenfull" width="60" height="60"></svg>
    </i>
</template>

<script>
import screenfull from 'screenfull'
export default {
    name: 'hamburger',
    props: {
        width: {
            type: Number,
            default: 22
        },
        height: {
            type: Number,
            default: 22
        },
        fill: {
            type: String,
            default: '#48576a'
        }
    },
    data() {
        return {
            isFullscreen: false
        }
    },
    methods: {
        click() {
            if (!screenfull.enabled) {
                this.$message({
                    message: 'you browser can not work',
                    type: 'warning'
                })
                return false
            }

            if (this.isFullscreen) {
                screenfull.exit()
                this.isFullscreen = false
            }
            else {
                screenfull.request()
                this.isFullscreen = true
            }
        }
    }
}
</script>
<style scoped>
.screenfull {
    position: absolute;
    top: 0;
    left: 0;
}
</style>
