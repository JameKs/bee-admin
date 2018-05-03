class HttpClient {
  static headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Token': sessionStorage.getItem('access_token') || '',
  };

  static addParams = (url, params) => {
    let nUrl = url;
    if (params) {
      const paramsArray = [];
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          for (const value of params[key]) {
            if (value != null) {
              paramsArray.push(`${key}=${value}`);
            }
          }
        } else if (params[key] != null) {
          paramsArray.push(`${key}=${params[key]}`);
        }
      });
      if (nUrl.search(/\?/) === -1) {
        nUrl += `?${paramsArray.join('&')}`;
      } else {
        nUrl += `&${paramsArray.join('&')}`;
      }
    }
    return nUrl;
  }

  static request = (method, url, body) => {
    // eslint-disable-next-line compat/compat
    return new Promise((resolve) => {
      fetch(url, {
        method,
        headers: {
          ...HttpClient.headers,
          'Access-Token': sessionStorage.getItem('access_token') || '',
        },
        body,
      }).then((response) => {
        if (response.ok) {
          return response;
        } else {
          throw response;
        }
      }).then((response) => {
        const token = response.headers.get('access-token');
        if (token) {
          sessionStorage.setItem('access_token', token);
        }
        return response;
      }).then(response => resolve(response.json()))
        .catch((err) => {
          const { status, statusText } = err;
          // eslint-disable-next-line no-console
          console.error('fetch failed,', `${status} ${statusText}`);
          return resolve({
            code: status,
            message: statusText,
          });
        });
    });
  };

  static get = (url, params) => HttpClient.request('GET', HttpClient.addParams(url, params));
  static post = (url, body) => HttpClient.request('POST', url, JSON.stringify(body));
  static put = (url, body) => HttpClient.request('PUT', url, JSON.stringify(body));
  static del = (url, body) => HttpClient.request('DELETE', url, JSON.stringify(body));
}

export default HttpClient;
