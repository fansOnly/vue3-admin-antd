
/**
 * 手机号码校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const validatePhone = async (rule, value) => {
    if (!!value && !(/^1[3456789]\d{9}$/.test(value.replace(/\s/g, '')))) {
        return Promise.reject('请输入正确的手机号');
    } else {
        return Promise.resolve();
    }
}

export {
    validatePhone
}
