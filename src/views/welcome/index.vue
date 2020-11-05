<template src='./index.html'></template>
<style src="./index.css" scoped></style>

<script>
    import {
        InfoCircleOutlined,
        CaretUpOutlined,
        CaretDownOutlined,
        EllipsisOutlined,
        EyeOutlined
    } from '@ant-design/icons-vue'
    import echarts from 'echarts'
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'
    dayjs.extend(relativeTime)

    import {
        visitEchartOption,
        payEchartOption,
        searchTotalEchartOption,
        searchAvgEchartOption,
        salesEchartOption,
        searchHotColumns,
    } from './config'
    import {
        getVisitsByWeek,
        getPayByWeek,
        getSearchTotalByWeek,
        getSearchAvgByWeek,
        getSalesByWeek,
        getSearchHot,
    } from '@/api/statics'
    import { getMessageList } from '@/api/message'
    import { getArticleList } from '@/api/article'
    import { reactive, ref, onMounted, readonly } from 'vue'
    import { toThousandFilter } from '@/utils/util'

    let salesDataSource = {}
    let salesEchart = null

    export default {
        name: 'welcome',
        setup() {
            const visitTotal = ref(0)
            const dayVisit = ref(0)
            const payTotal = ref(0)
            const percent = ref(78)

            const searchTotal = ref(0)
            const searchAvg = ref(0)

            const searchList = ref([])

            const salesList = ref([])
            const totalSales = ref(0)

            const newsList = ref([])
            const messageList = ref([])

            let pagination = reactive({
                current: 1,
                pageSize: 4
            })

            const switchSalesType = e => {
                let salesListInit =
                    salesDataSource[e.target.value + ['Data']]

                salesEchartOption.dataset.source = salesListInit
                salesEchart.setOption(salesEchartOption)
                totalSales.value = calcSaleTotal(salesListInit)
                salesList.value = salesListInit
            }

            const handleTableChange = page => {
                if (!searchList.value.length) return
                pagination.current = page.current
                apiGetSearchHot()
            }

            const calcSaleTotal = data => {
                return parseInt(
                    data.reduce(
                        (sum, salesPerData) => sum + parseInt(salesPerData[1]),
                        0
                    )
                )
            }

            const apiGetSearchHot = async () => {
                const { current, pageSize } = pagination
                const { data = [], total = 0 } = await getSearchHot({page: current, pageSize})
                searchList.value = data
                pagination.total = total
            }
            const apiGetMessageList = async () => {
                const params = { page: 1, pageSize: 2 }
                const data = await getMessageList(params)
                messageList.value = data.data
            }
            const apiGetProductList = async () => {
                const params = { page: 1, pageSize: 5 }
                const data = await getArticleList(params)
                newsList.value = data.data
            }
            apiGetSearchHot()
            apiGetMessageList()
            apiGetProductList()

            onMounted(() => {
                // 渲染访问量统计
                const visitEchartEle = document.getElementById('visitEchart')
                let visitEchart = echarts.init(visitEchartEle)

                // 渲染订单金额统计
                const payEchartEle = document.getElementById('payEchart')
                let payEchart = echarts.init(payEchartEle)

                // 渲染搜索总量统计
                const searchTotalEchartEle = document.getElementById('searchTotalEchart')
                let searchTotalEchart = echarts.init(searchTotalEchartEle)

                // 渲染平均搜索统计
                const searchAvgEchartEle = document.getElementById('searchAvgEchart')
                let searchAvgEchart = echarts.init(searchAvgEchartEle)

                // 渲染销售金额统计
                const salesEchartEle = document.getElementById('salesEchart')
                salesEchart = echarts.init(salesEchartEle)

                const getAllData = async () => {
                    const [
                        visitsByWeekData,
                        payByWeekdata,
                        searchTotalByWeekdata,
                        searchAvgByWeekdata,
                        salesByWeekdata,
                    ] = await Promise.all([
                        getVisitsByWeek(),
                        getPayByWeek(),
                        getSearchTotalByWeek(),
                        getSearchAvgByWeek(),
                        getSalesByWeek(),
                    ])

                    visitEchartOption.dataset.source = visitsByWeekData.data
                    visitEchart.setOption(visitEchartOption)
                    visitTotal.value = visitsByWeekData.total
                    dayVisit.value = visitsByWeekData.day

                    payEchartOption.dataset.source = payByWeekdata.data
                    payEchart.setOption(payEchartOption)
                    payTotal.value = payByWeekdata.total

                    searchTotalEchartOption.dataset.source = searchTotalByWeekdata.data
                    searchTotalEchart.setOption(searchTotalEchartOption)
                    searchTotal.value = searchTotalByWeekdata.total

                    searchAvgEchartOption.dataset.source = searchAvgByWeekdata.data
                    searchAvgEchart.setOption(searchAvgEchartOption)
                    searchAvg.value = searchAvgByWeekdata.total

                    salesEchartOption.dataset.source = salesByWeekdata.data.allData
                    salesEchart.setOption(salesEchartOption)

                    salesDataSource = salesByWeekdata.data
                    let salesListInit = salesDataSource.allData
                    totalSales.value = calcSaleTotal(salesListInit)
                    salesList.value = salesListInit
                }
                getAllData()
            })

            return {
                dayjs,
                toThousandFilter,
                searchHotColumns: readonly(searchHotColumns),
                visitTotal,
                dayVisit,
                payTotal,
                percent,
                searchTotal,
                searchAvg,
                searchList,
                totalSales,
                salesList,
                newsList,
                messageList,
                pagination,
                switchSalesType,
                handleTableChange
            }
        },
        components: {
            InfoCircleOutlined,
            CaretUpOutlined,
            CaretDownOutlined,
            EllipsisOutlined,
            EyeOutlined
        }
    }
</script>
