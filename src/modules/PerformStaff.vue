<template>
    <div>
         <el-table
            :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
            border
            size="small"
            v-loading="loading"
            max-height="450px"
            style="width: 100%">
             <el-table-column
                type="index"
                width="50">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="sex"
                label="性别"
                width="180">
            </el-table-column>
            <el-table-column
                prop="job"
                label="工作职位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="age"
                label="年龄">
            </el-table-column>
             <el-table-column
                prop="fromCity"
                label="户籍地址">
            </el-table-column>
             <el-table-column
                prop="phoneNumber"
                label="手机号码">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right; padding-top: 12px">
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                background
                :page-sizes="[10, 20, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
    name: 'performStaff',
    data () {
        return {
            initTableData: [],
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            loading: true,
            deleteFlag: true
        }
    },

    methods: {
        deleteRow(index, rows) {
            if (this.deleteFlag) {
                this.deleteFlag = false
                rows.splice(index, 1);
                 this.$message({
                    message: '删除成功',
                    type: 'success',
                    duration: 1000,
                    onClose:  () => {
                        this.deleteFlag = true
                    }
                });
            }
        },
        handleCurrentChange (currentPage) {
            this.currentPage = currentPage
        },
        handleSizeChange (pageSize) {
            this.pageSize = pageSize
        }
    },

    created () {
        this.$store.dispatch('initPerformStaffPage')
            .then(() => {
                const { staffListTable } = this.$store.state
                this.tableData = staffListTable.slice()
                this.loading = false
            })
    }
}
</script>