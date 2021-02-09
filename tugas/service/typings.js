/**
 * Performance type definition
 * @typedef {Object} PerformanceData
 * @property {number} total_task jumlah semua pekerjaan
 * @property {number} task_done jumlah pekerjaan yang telah diselesaikan
 * @property {number} task_cancelled jumlah pekerjaan yang dibatalkan
 * @property {number} total_worker jumlah pekerja yang terdaftar
 */

/**
 * Task type definition
 * @typedef {Object} TaskData
 * @property {string} job nama pekerjaan
 * @property {number} assignee id dari pekerja yang ditugaskan
 * @property {Blob} attachment file lampiran dari pekerjaan
 */
