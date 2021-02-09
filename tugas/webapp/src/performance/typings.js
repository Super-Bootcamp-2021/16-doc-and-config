/**
 * State type definition
 * @typedef {Object} State 
 * @property {boolean} loading loading status
 * @property {boolean} error error status
 * @property {Summary} summary true when task are finished
 */

 /**
 * Summary type definition
 * @typedef {Object} Summary
 * @property {number} total_task count of total all task
 * @property {number} task_done count of total task with **done** status
 * @property {number} task_cancelled count of total task with **cancel** status
 * @property {number} total_worker count of total all worker
 */