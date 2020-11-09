<template>
    <HomeOutlined v-if="icon === 'home'" />
    <SettingOutlined v-if="icon === 'setting'" />
    <PictureOutlined v-if="icon === 'picture'" />
    <TeamOutlined v-if="icon === 'user'" />
    <TableOutlined v-if="icon === 'table'" />
    <ProjectOutlined v-if="icon === 'project'" />
    <MessageOutlined v-if="icon === 'contacts'" />
    <FileSearchOutlined v-if="icon === 'file-search'" />
    <ClusterOutlined v-if="icon === 'team'" />
    <BarChartOutlined v-if="icon === 'bar-chart'" />
    <CoffeeOutlined v-if="icon === 'coffee'" />
    <DeploymentUnitOutlined v-if="icon === 'system'" />
</template>

<script>
import {
    HomeOutlined,
    SettingOutlined,
    PictureOutlined,
    TeamOutlined,
    TableOutlined,
    ProjectOutlined,
    MessageOutlined,
    FileSearchOutlined,
    ClusterOutlined,
    BarChartOutlined,
    CoffeeOutlined,
    DeploymentUnitOutlined
} from '@ant-design/icons-vue'

export default {
    props: {
        icon: {
            type: String,
            default: ''
        }
    },
    components: {
        HomeOutlined,
        SettingOutlined,
        PictureOutlined,
        TeamOutlined,
        TableOutlined,
        ProjectOutlined,
        MessageOutlined,
        FileSearchOutlined,
        ClusterOutlined,
        BarChartOutlined,
        CoffeeOutlined,
        DeploymentUnitOutlined
    }
}
</script>
