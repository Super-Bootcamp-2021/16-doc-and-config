/** @module httpClient */

/**
 * basic client to request to server
 * @param {string} endpoint url endpoint
 * @param {object} json Content-Type, if exist
 * @param {RequestInit} param2 options
 * @returns {Promise}
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
 * GET request
 * @param {string} endpoint url endpoint
 * @param {RequestInit} customConf options
 */
client.get = (endpoint, customConf = {}) => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

/**
 * POST request
 * @param {string} endpoint url endpoint
 * @param {Object} body content from request
 * @param {Object} json Content-Type, if exist
 * @param {RequestInit} customConf options
 */
client.post = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};

/**
 * PUT request
 * @param {string} endpoint url endpoint
 * @param {Object} body content from request
 * @param {Object} json Content-Type, if exist
 * @param {RequestInit} customConf options
 */
client.put = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};

/**
 * DELETE request
 * @param {string} endpoint url endpoint
 * @param {Object} body content from request
 * @param {Object} json Content-Type, if exist
 * @param {RequestInit} customConf options
 */
client.del = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};

module.exports = { client };
