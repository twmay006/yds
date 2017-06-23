<template lang="html">
    <div >
        <el-button :class="top ? 'dn' : '' "  type="primary" icon="arrow-up" size="mini" @click="backTop()"></el-button>
        <el-button :class="bottom ? 'dn' : '' " type="primary" icon="arrow-down" size="mini" @click="backBottom()"></el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dom: '',
            top: true,
            bottom: true
        }
    },
    methods: {
        backTop() {
            this.dom.scrollTop = 0
        },
        backBottom() {
            this.dom.scrollTop = this.dom.scrollHeight
        },
        toggle() {
            let top = this.dom.scrollTop,
                scrollHeight = this.dom.scrollHeight
            if (top && top === scrollHeight - this.dom.offsetHeight) {
                this.top = false
                this.bottom = true
            }
            else if (top === 0 && scrollHeight !== this.dom.offsetHeight) {
                this.top = true
                this.bottom = false
            }
            else if (top > 0 && top < scrollHeight) {
                this.top = false
                this.bottom = false
            }
            else {
                this.top = true
                this.bottom = true
            }
        }
    },
    mounted() {
        this.dom = document.getElementsByClassName('content-container')[0]
        this.dom.addEventListener('scroll', this.toggle)
        this.toggle()
    }
}
</script>

<style lang="scss" scoped>
    div{
        position: fixed;
        right: 30px;
        bottom: 30px;
        z-index: 222;
        opacity: .2;
        &:hover{
            opacity: 1;
        }
        button{
            margin: 20px 0 !important;
            display: block;
            &.dn{
                visibility: hidden
            }
        }
    }
</style>
