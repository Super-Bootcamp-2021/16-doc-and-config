/**
 * Task type definition
 * @typedef {Object} Task
 * @property {number} id id of a task
 * @property {string} job job name
 * @property {boolean} done true when task is done
 * @property {boolean} cancelled true when task is cancelled
 * @property {Date} addedAt time of task created
 * @property {object} attachment task attachent's file
 * @property {number} assignee_id task relation with worker
 */

/**
 * State type definition
 * @typedef {Object} State
 * @property {boolean} loading  true when loading
 * @property {string} error error message, null when not found error
 * @property {Array.<Task>} task array tasks data
 * @property {Array.<Worker>} workers array workers data
 */

/**
 * Action type definition
 * @typedef {Object} Action
 * @property {string} type  type of action
 * @property {Object<any>} payload value wich dispatch to action
 */

/**
 * Worker type definition
 * @typedef {Object} WorkerData
 * @property {number} id id of a worker
 * @property {string} name worker's name
 * @property {number} age worker's age
 * @property {string} bio worker's biografi
 * @property {string} address worker's address
 * @property {string} photo url worker's photo
 */
