/** @module performance */
const { read, save } = require('../lib/kv');

const TASK_TOTAL_KEY = 'task.total';
const TASK_DONE_KEY = 'task.done';
const TASK_CANCELLED_KEY = 'task.cancelled';
const WORKER_TOTAL_KEY = 'worker.total';

/**
 * Mendapatkan rangkuman performa
 * @returns {Promise<PerformanceData>} object yang berisi data performa
 */
async function summary() {
  const data = {
    total_task: parseInt((await read(TASK_TOTAL_KEY)) || '0', 10),
    task_done: parseInt((await read(TASK_DONE_KEY)) || '0', 10),
    task_cancelled: parseInt((await read(TASK_CANCELLED_KEY)) || '0', 10),
    total_worker: parseInt((await read(WORKER_TOTAL_KEY)) || '0', 10),
  };
  return data;
}

/**
 * Menambahkan jumlah pekerjaan
 * @async
 */
async function increaseTotalTask() {
  const raw = await read(TASK_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_TOTAL_KEY, val);
}

/**
 * Menambahkan jumlah pekerjaan yang telah diselesaikan
 * @async
 */
async function increaseDoneTask() {
  const raw = await read(TASK_DONE_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_DONE_KEY, val);
}

/**
 * Menambahkan jumlah pekerjaan yang dibatalkan
 * @async
 */
async function increaseCancelledTask() {
  const raw = await read(TASK_CANCELLED_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(TASK_CANCELLED_KEY, val);
}

/**
 * Menambahkan jumlah pekerja yang terdaftar
 * @async
 */
async function increaseTotalWorker() {
  const raw = await read(WORKER_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  val++;
  await save(WORKER_TOTAL_KEY, val);
}

/**
 * Mengurangi jumlah pekerja yang terdaftar
 * @async
 */
async function decreaseTotalWorker() {
  const raw = await read(WORKER_TOTAL_KEY);
  let val = parseInt(raw || '0', 10);
  if (val > 0) {
    val--;
  }
  await save(WORKER_TOTAL_KEY, val);
}

module.exports = {
  summary,
  increaseTotalTask,
  increaseDoneTask,
  increaseCancelledTask,
  increaseTotalWorker,
  decreaseTotalWorker,
};
