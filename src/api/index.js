

// const baseURL = 'http://localhost:3000';

const aiRequest = (data) => {
    const {url, method, body, query, headers = {}} = data;
    let reqUrl = url;
    const reqParams = {};

    if(body){
        reqParams.body = JSON.stringify(body);
    }
    if(query){
        url += '?' + new URLSearchParams(query).toString();
    }

    return new Promise((resolve, reject) => {
        fetch(reqUrl, {
            method: method || 'GET',
            ...reqParams,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }).then(res => {
           resolve(res.json());
        }).then(json => {
            resolve(json);
        }).catch(err => {
            reject(err);
        })
    })
}

const aiChat = (data) => {
  return fetch(`/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export {
    aiRequest,
    aiChat
}

export default{}


