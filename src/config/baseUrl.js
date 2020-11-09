/* eslint-disable no-undef */
// const getDomain = function() {
//     let _result = ''
//     if(location) {
//         _result =  location.protocol + '//' + location.hostname

//         if(location.port) _result += ':' + location.port
//     }

//     return _result
// }

const base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000';
const resource_url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://localhost:3000/resources';

export const apiUrl = base_url;
export const uploadUrl = base_url + '/common/upload';
export const bulkUploadUrl = base_url + '/common/bulkupload';
export const froalaUploadUrl = base_url + '/common/froalaupload';
export const resourcePath = resource_url;
export const uploadHeaders = {Authorization: `Bearer ${sessionStorage.getItem('token')}`};
