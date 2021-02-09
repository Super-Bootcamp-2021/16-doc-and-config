/** @module http_client */

/**
 * http-client - to set format and how the data is transmitted
 * @param {any} endpoint 
 * @param {object} json data-structure 
 * @returns {Promise} data
 */
async function client(endpoint, json, { method, body, ...customConf } = {}) {
  let headers;
  if (json) {
    headers = { 'Content-Type': 'application/json' };
  }

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  if (body) {
    if (json) {
      config.body = JSON.stringify(body);
    } else {
      const formData = new FormData();
      for (const name in body) {
        formData.append(name, body[name]);
      }
      config.body = formData;
    }
  }

  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

/**
 * use get method for client module
 * @param {any} endpoint 
 * @param {array} customConf
 * @returns {any} data
 */
client.get = (endpoint, customConf = {}) => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

/**
 * use post method for client module
 * @param {any} endpoint 
 * @param {array} customConf
 * @param {any} body
 * @param {object} json
 * @returns {any} data
 */
client.post = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};


/**
 * use putt method for client module
 * @param {any} endpoint 
 * @param {array} customConf
 * @param {any} body
 * @param {object} json
 * @returns {any} data
 */
client.put = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};


/**
 * use del method for client module
 * @param {any} endpoint 
 * @param {array} customConf
 * @param {any} body
 * @param {object} json
 * @returns {any} data
 */
client.del = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};

module.exports = { client };
