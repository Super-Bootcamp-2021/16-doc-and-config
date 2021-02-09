/** @module worker */

const { getConnection } = require('typeorm');
const { Worker } = require('./worker.model');
const bus = require('../lib/bus');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * add new worker
 * @param {WorkerData} data data worker
 * @returns {Promise<Worker>} new worker data with id
 * @throws {string} when data not contain worker property
 */
async function register(data) {
  if (!data.name || !data.age || !data.bio || !data.address || !data.photo) {
    throw ERROR_REGISTER_DATA_INVALID;
  }
  const workerRepo = getConnection().getRepository('Worker');
  const worker = new Worker(
    null,
    data.name,
    parseInt(data.age, 10),
    data.bio,
    data.address,
    data.photo
  );
  await workerRepo.save(worker);
  bus.publish('worker.registered', worker);
  return worker;
}

/**
 * get list worker
 * @returns {Promise<Worker[]>} list of workers
 */
function list() {
  const workerRepo = getConnection().getRepository('Worker');
  return workerRepo.find();
}

/**
 * get worker detail by id
 * @param {number} id worker's id
 * @returns {Promise<Worker>} get worker 
 * @throws {string} when worker id not found in database
 */
async function info(id) {
  const workerRepo = getConnection().getRepository('Worker');
  const worker = await workerRepo.findOne(id);
  if (!worker) {
    throw ERROR_WORKER_NOT_FOUND;
  }
  return worker;
}

/**
 * remove worker by id
 * @param {number} id worker's id
 * @returns {Promise<Worker>} remove worker 
 * @throws {string} when worker id not found in database
 */
async function remove(id) {
  const workerRepo = getConnection().getRepository('Worker');
  const worker = await workerRepo.findOne(id);
  if (!worker) {
    throw ERROR_WORKER_NOT_FOUND;
  }
  await workerRepo.delete(id);
  bus.publish('worker.removed', worker);
  return worker;
}

module.exports = {
  register,
  list,
  remove,
  info,
  ERROR_REGISTER_DATA_INVALID,
  ERROR_WORKER_NOT_FOUND,
};
