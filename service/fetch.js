export const http_factory = ({method, paramsType}) => {

  return async (path, params) => {
    console.log(params);

    const meta = {
      method : method,

      headers : {
        authorization : 'hahahaha'
      }
    };

    if(paramsType === 'json') {

    } else if (paramsType === 'query') {

      if(query) {
        path += "?" + query
      }
    }

    try{

      const response = await fetch(path, meta)

      console.log(TAG + " the response path -->> " + path + " and the status code -->> " + response.status);

      if(response.status === 404) {
        return {
          success : true,
          data : null
        }
      }
      if(response.status >= 201 && response.status < 300) {
        return {
          success : true,
          data : null
        }
      }

      const text = await response.text()
      if (response.status == 200 && text.length == 0) {
        return {
          success : true,
          data : null
        }
      }

      const jsonData = JSON.parse(text)


      if(response.status >= 400) {
        if (response.status === 401) {

          setTimeout( () => {

          }, 10)
          return {
            terminate : true
          }
        }
        else {
          return {
            success : false,
            code : jsonData.code,
            message : jsonData.message
          }
        }

      } else {
        return {
          success : true,
          data : jsonData
        }
      }
    }
    catch(ex) {

      console.log("ex==",ex);
      return {
        success : false,
        code : 400,
        message : "网络请求错误"
      }
    }


    return jsonData
  }
}


export const http_post = http_factory({method : "POST", paramsType : "json"})
export const http_get = http_factory({method : "GET", paramsType : "query"})
export const http_put = http_factory({method : "PUT", paramsType : "json"})
