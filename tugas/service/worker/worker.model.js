/** @module WorkerModel */
const { EntitySchema } = require('typeorm');

/**
 * worker model
 */
class Worker {
  /**
   * create new instance of worker model
   * @param {string} id id of a worker
   * @param {string} name name worker
   * @param {integer} age age worker
   * @param {string} bio bio worker
   * @param {string} address address worker
   * @param {string} photo name file photo worker
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
 * entry schema of worker model
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
