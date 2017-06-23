<template lang="html">
    <div>
        <el-upload
            action="//upload-z2.qiniu.com"
            list-type="picture-card"
            :data="form"
            :file-list="fileList"
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">注:只能上传jpg/png文件，且不超过2M，图片右上角出现成功标志方才上传成功</div>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '../api/'
export default {
    data() {
        return {
            domain: '',   // 上传图片的外链域名
            form: {},
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: this.value || []
        }
    },
    props: ['value'],
    methods: {
        beforeUpload(file) {
            let isFormat = (file.type === 'image/jpeg' || file.type === 'image/png'),
                isLt2M = file.size / 1024 / 1024 < 2

            if (!isFormat) {
                this.$message.error('上传图片只能是 JPG或PNG 格式!')
                return false
            }

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
                return false
            }

            return getToken().then(res => {
                this.domain = res.domain
                this.form = {
                    token: res.token
                }
            })
        },
        handleSuccess(response, file, fileList) {
            fileList[fileList.length - 1].url = `${ this.domain }/${ response.hash }`
            this.$emit('imgUrl', fileList)
        },
        handleRemove(file, fileList) {
            this.$emit('imgUrl', fileList)
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        }
    },
    mounted() {
        // console.log(this.fileList)
    }
}
</script>
