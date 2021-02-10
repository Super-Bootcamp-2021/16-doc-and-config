/**
 * Type definition Worker
 * @typedef {Object} Worker
 * @property {number} id id pekerjaan
 * @property {string} job deskripsi pekerjaan
 * @property {boolean} done pekerjaan selesai
 * @property {boolean} cancelled pekerjaan dibatalkan
 * @property {string} attachment url attachment pekerjaan
 * @property {object} addedAt waktu pembuatan pekerjaan
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
 * @property {Array<Peformance>} workers array data pekerja
 */
