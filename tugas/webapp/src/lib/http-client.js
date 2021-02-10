/**
 * @module http-client
 */

/**
 * Melakukan request ke endpoint servis
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} options parameter tambahan pada request [request] http://localhost
 * @returns {Promise<any>} hasil request ke endpoint servis
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
 * request ke endpoint dengan method GET
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} customConf opsi untuk konfigurasi request
 */

client.get = (endpoint, customConf = {}) => {
  return client(endpoint, true, { method: 'GET', ...customConf });
};

/**
 * request ke endpoint dengan method POST
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} customConf opsi untuk konfigurasi request
 * @param {BodyInit} body konten dari request
 * @param {JSON} json konten request berbentuk JSON
 */
client.post = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'POST', body, ...customConf });
};

/**
 * request ke endpoint dengan method PUT
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} customConf opsi untuk konfigurasi request
 * @param {BodyInit} body konten dari request
 * @param {JSON} json konten request berbentuk JSON
 */

client.put = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'PUT', body, ...customConf });
};

/**
 * request ke endpoint dengan method DELETE
 * @param {string} endpoint target / url endpoint
 * @param {RequestInit} customConf opsi untuk konfigurasi request
 * @param {BodyInit} body konten dari request
 * @param {JSON<any>} json konten request berbentuk JSON
 */

client.del = (endpoint, body, json, customConf = {}) => {
  return client(endpoint, json, { method: 'DELETE', body, ...customConf });
};

module.exports = { client };
