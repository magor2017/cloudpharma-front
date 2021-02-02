//import { link } from './link';
const link="http://127.0.0.1/backendcloudpharma/public/index.php/api";
function post(path,body){
    return fetch(link+path,{
        method:'post',
        body:body,
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then(rep=>rep.json()).then(t=>{
        return {status:1,data:t};
    }).catch(error=>{
        return {status:0};
    })

}
module.exports.post=post;