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
 * @property {string} attachment nama file lampiran dari pekerjaan
 */

/**
 * Worker type definition
 * @typedef {Object} WorkerData
 * @property {string} name nama pekerja
 * @property {string} age usia pekerja
 * @property {string} bio biodata pekerja
 * @property {string} address alamat pekerja
 * @property {string} photo nama file foto pekerja
 */
