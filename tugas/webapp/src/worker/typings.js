/**
 * Worker type definition
 * @typedef {Object} Worker
 * @property {number} id id of a worker
 * @property {string} name worker's name
 * @property {number} age worker's age
 * @property {string} bio worker's biografi
 * @property {string} address worker's address
 * @property {Object} photo workers's files photo
 */

/**
 * State type definition
 * @typedef {Object} State
 * @property {boolean} loading  true when loading
 * @property {string} error error message, null when not found error
 * @property {Array.<Worker>} workers array workers data
 */

 /**
 * Action type definition
 * @typedef {Object} Action
 * @property {string} type  type of action
 * @property {Object<any>} payload value wich dispatch to action
 */