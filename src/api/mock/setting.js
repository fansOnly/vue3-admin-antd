import Mock from 'mockjs';

/**
 * 获取系统基本设置
 */
const getSiteInfo = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? {
            'base_info': {
                'name': 'wtf for vue',
                'phone': /^1[3456789]\d{9}$/,
                'email': '@email',
                'copyright': /^Copyright ©️ 2019 [\u4e00-\u9fa5]{10,15}$/,
                'content': '@cparagraph(1,3)',
            },
            'advance_info': {},
            'seo_info': {
                'title': '@ctitle',
                'keywords': '@cparagraph(1)',
                'description': '@cparagraph(3)',
            },
            'hotwords_info': ['热销', '新品'],
        } : {}
    })
}

Mock.mock(/\/siteinfo\/detail/, /get|post/i, getSiteInfo);

/**
 * 更新系统基本设置
 */
const updateSiteInfo = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/siteinfo\/update/, /get|post/i, updateSiteInfo);


/**
 * 获取上传设置
 */
const getUploadSetting = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
        'data': success ? {
            max_files: 20,
            chunk_size: 512,
            image_max_filesize: 10240,
            image_extensions: 'jpg, jpeg, png, gif, bmp',
            video_max_filesize: 20480,
            video_extensions: 'mp4',
            audio_max_filesize: 10240,
            audio_extensions: 'mp3',
            file_max_filesize: 10240,
            file_extensions: 'txt, pdf, doc, docx, xls, xlsx, ppt, pptx, zip, rar'
        } : {}
    })
}

Mock.mock(/\/siteinfo\/upload\/detail/, /get|post/i, getUploadSetting);

/**
 * 更新上传设置
 */
const updateUploadSetting = () => {
    const success = true;
    return Mock.mock({
        'code': success ? '200' : '400',
        'msg': success ? 'sucesss' : '缺少参数',
    })
}

Mock.mock(/\/siteinfo\/upload\/update/, /get|post/i, updateUploadSetting);
