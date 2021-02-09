/** @module workerSchema */
const { EntitySchema } = require('typeorm');

/**
 * model pekerja
 */
class Worker {
  /**
   * Membuat object baru berdasarkan model pekerja
   * @param {number} id id dari pekerja
   * @param {string} name nama pekerja
   * @param {number} age usia pekerja
   * @param {string} bio biodata pekerja
   * @param {string} address alamat pekerja
   * @param {string} photo nama file foto pekerja
   */
  constructor(id, name, age, bio, address, photo) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.bio = bio;
    this.address = address;
    this.photo = photo;
  }
}

/**
 * Membuat skema dari model pekerja
 */
const WorkerSchema = new EntitySchema({
  name: 'Worker',
  target: Worker,
  tableName: 'workers',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    age: {
      type: 'int',
    },
    bio: {
      type: 'text',
    },
    address: {
      type: 'text',
    },
    photo: {
      type: 'varchar',
      length: 255,
    },
  },
});

module.exports = {
  Worker,
  WorkerSchema,
};
