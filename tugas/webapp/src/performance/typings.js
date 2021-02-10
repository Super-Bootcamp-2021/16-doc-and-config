/**
 * PerformanceState type definition
 * @typedef {Object} PerformanceState
 * @property {boolean} loading loading status
 * @property {boolean} error error status
 * @property {PerformanceSummary} summary true when task are finished
 */

 /**
 * PerformanceSummary type definition
 * @typedef {Object} PerformanceSummary
 * @property {number} total_task count of total all task
 * @property {number} task_done count of total task with **done** status
 * @property {number} task_cancelled count of total task with **cancel** status
 * @property {number} total_worker count of total all worker
 */