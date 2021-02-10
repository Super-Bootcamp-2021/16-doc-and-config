/** @module WorkerSchema */

const { EntitySchema } = require('typeorm');

class Worker {
  /**
   * buat instance baru dari worker model
   * @param {string} id id dari pekerja
   * @param {string} name nama dari pekerja
   * @param {string} age umur dari pekerja
   * @param {string} bio biografi dari pekerja
   * @param {string} address alamat pekerja
   * @param {photo} attachment foto pekerja
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
 * enty schema of worker model
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
