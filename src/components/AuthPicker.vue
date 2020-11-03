<template>
    <div>
        <div v-for="(parent, pindex) in dataList" :key="parent.name">
            <a-checkbox :indeterminate="parent.indeterminate" :checked="parent.checkAll" @change="onMenuChange($event, pindex)">{{$t(parent.breadcrumbName)}}</a-checkbox>
            <hr />
            <a-row v-if="parent.children.length">
                <a-checkbox-group v-model="parent.checkedList" @change="onMenuItemChange($event, pindex)" style="width:100%;padding-left:20px;">
                    <a-col v-for="(child, cindex) in parent.children" :key="cindex" :span="8" style="padding-top: 10px;">
                        <a-checkbox :value="child.name">{{$t(child.breadcrumbName)}}</a-checkbox>
                    </a-col>
                </a-checkbox-group>
            </a-row>
        </div>
    </div>
</template>
<script>
import menuList from 'config/menu'
import { deepCopy } from 'utils/util'

export default {
    name: 'authPicker',
    props: {
        authList: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            dataList: menuList,
        };
    },
    watch: {
        dataList: {
            handler: function(val) {
                this.dataList = val;
                this.$emit('update', this.updateCheckList(val));
            },
            immediate: true,
            deep: true
        },
    },
    created() {
        this.initAuthList();
    },
    methods: {
        onMenuChange(e, pindex) {
            // console.log('onMenuChange', e, pindex);
            const parent = this.dataList[pindex];
            parent.checkedList = e.target.checked ? parent.children && parent.children.length ? parent.children.map(item => item.name) : [] : [];
            parent.indeterminate = false;
            parent.checkAll = e.target.checked;
            this.$set(this.dataList, pindex, parent);
        },
        onMenuItemChange(val, pindex) {
            // console.log('onMenuItemChange', val, pindex);
            const parent = this.dataList[pindex];
            parent.indeterminate = !!val.length && val.length < parent.children.length;
            parent.checkAll = val.length == parent.children.length;
            parent.checkedList = val;
            this.$set(this.dataList, pindex, parent);
        },
        initAuthList() {
            let _dataList = deepCopy(this.dataList);
            _dataList.map(parent => {
                let checkedParentList = [];
                let checkedParent = null;
                // console.log('authlist', this.authList)
                checkedParentList = this.authList.filter(v => v.name == parent.name);
                if (checkedParentList.length) {
                    checkedParent = checkedParentList[0];
                }
                parent.indeterminate = !!checkedParent && checkedParent.valueList.length < parent.children.length;
                parent.checkAll = !!checkedParent && checkedParent.valueList.length == parent.children.length;
                parent.checkedList = checkedParent ? checkedParent.valueList.map(v => v.name) : [];
            })
            this.dataList = _dataList;
            // console.log('_datalist', _dataList)
        },
        updateCheckList(arr) {
            const _checkedList = [];
            arr.map(item => {
                if (item.checkedList) {
                    let _valueList = [];
                    item.checkedList.map(v => {
                        _valueList.push({name: v})
                    })
                    _checkedList.push({name: item.name, valueList: _valueList});
                }
            })
            return _checkedList;
        }
    }
};
</script>

