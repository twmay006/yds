<!-- <v-educe  :tableData="tableData" fileName="ceshi" :columns="columns"> </v-educe> -->
<template lang="html">
    <div>
        <el-button type="primary" @click="exportBtn()" >导出<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
</template>

<script>
import json2csv from 'json2csv'
export default {
    props: ['tableData', 'fileName', 'columns'],
    methods: {
        exportBtn() {
            let fields = [],
                fieldNames = []
            this.columns.forEach(k => {
                fields.push(k.prop)
                fieldNames.push(k.label)
            })
            try {
                let result = json2csv({
                        data: this.tableData,
                        fields: fields,
                        fieldNames: fieldNames
                    }),
                    csvContent = `data:text/csvcharset=GBK,\uFEFF${ result }`,
                    encodedUri = encodeURI(csvContent),
                    link = document.createElement('a')
                link.setAttribute('href', encodedUri)
                link.setAttribute('download', `${ (this.fileName || 'file') }.csv`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
            catch (err) {
                // console.error(err)
            }
        }
    }
}
</script>
<style lang="css" scoped>
    div{
        display: inline-block;
    }
</style>
