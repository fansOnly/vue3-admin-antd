<template>
    <a-modal :visible="visible" title="预览二维码" :width="400" destroyOnClose :maskClosable="false" :footer="null" @cancel="$emit('cancel')">
        <div id="qrcodeBox"></div>
        <div class="optbtns">
            <a-button style="margin-right:10px;" @click="downloadImg">下载</a-button>
            <a-button @click="copyLink">复制链接</a-button>
        </div>
    </a-modal>
</template>

<script>
import QRCode from 'qrcode'

import { toRefs, watch, nextTick, getCurrentInstance } from 'vue'

import { copy, download } from 'utils/util'

export default {
    name: 'Qrcode',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            default: location.href
        }
    },
    setup(props) {
        const { visible, url } = toRefs(props)
        const { ctx } = getCurrentInstance()

        watch(visible, val => {
            val && createQrcode()
        })

        const createQrcode = async() => {
            await nextTick()
            QRCode.toCanvas( url.value, { errorCorrectionLevel: 'H' }, function(err,canvas) {
                if (err) throw err;

                const container = document.getElementById('qrcodeBox');
                container.appendChild(canvas);
            })
        }

        const downloadImg = () => {
            QRCode.toDataURL(url.value, function (err, url) {
                if (err) throw err;
                download(url, 'qrcode.png');
            })
        }
        const copyLink = () => {
            copy(url.value, () => {
                ctx.$message.success('复制成功，请在浏览器访问预览');
            });
        }

        return {
            downloadImg,
            copyLink
        }
    }
};
</script>
<style scoped>
#qrcodeBox {
    text-align: center;
}
.optbtns {
    margin: 10px 0;
    text-align: center;
}
</style>
