/**
 * Type definition Worker
 * @typedef {Object} Worker
 * @property {number} id id pekerja
 * @property {string} name nama pekerja 
 * @property {number} age umur pekerja
 * @property {string} bio biografi pekerja
 * @property {string} address alamat pekerja
 * @property {string} photo url foto pekerja
 */

/**
* Type definition Action
* @typedef {Object} Action
* @property {string} type tipe aksi
* @property {Object<any>} payload nilai payload
*/

/**
 * Type definition State
 * @typedef {Object} State
 * @property {boolean} loading periksa loading aplikasi
 * @property {string} error menampilkan pesan error
 * @property {Array<Worker>} workers array data pekerja
 */
