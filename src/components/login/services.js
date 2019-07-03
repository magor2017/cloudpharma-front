import React,{Component} from 'react';

let AsyncService = (defaultOptions) => {

    	let header = new Headers({
		    'Access-Control-Allow-Origin':'*',
		    'Content-Type': 'multipart/form-data'
		});

		let sentData={
		    method:defaultOptions.method,
		    mode: 'cors',
		    header: header,
		    body:defaultOptions.body || ''
		};

		return new Promise((reslove,reject)=>{
		    fetch(defaultOptions.url, sentData)
		        .then(response=> response.json())
		        .then(responseText=>{
		            let resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
		            reslove(resp);
		        }).catch(err=>{
		        //console.log(err);
		        reject(err);
			});
		}).catch(err => {
			console.log(err);
		});
}

export default  AsyncService