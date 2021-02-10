/** @module worker */
const { getConnection } = require('typeorm');
const { Worker } = require('./worker.model');
const bus = require('../lib/bus');

const ERROR_REGISTER_DATA_INVALID = 'data registrasi pekerja tidak lengkap';
const ERROR_WORKER_NOT_FOUND = 'pekerja tidak ditemukan';

/**
 * Menambahkan data pekerja baru
 * @async
 * @param {WorkerData} data data-data mengenai pekerja
 * @returns {Promise<Worker>} detail pekerja baru dengan id
 * @throws {string} ketika data pekerja yang dimasukkan tidak lengkap
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
 * Mendapatkan data semua pekerja
 * @returns {Promise<Worker[]>} kumpulan data pekerja
 */
function list() {
  const workerRepo = getConnection().getRepository('Worker');
  return workerRepo.find();
}

/**
 * Mendapatkan data pekerja dengan id tertentu
 * @param {number} id id dari pekerja
 * @returns {Promise<Worker>} data pekerja dengan id yang telah dimasukkan
 * @throws {string} ketika pekerja tidak ditemukan
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
 * Menghapus data pekerja
 * @param {number} id id dari pekerja
 * @returns {Promise<Worker>} data pekerja yang telah dihapus
 * @throws {string} ketika pekerja tidak ditemukan
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
