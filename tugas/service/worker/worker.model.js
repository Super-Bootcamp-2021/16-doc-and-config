/** @module workerSchema */
const { EntitySchema } = require('typeorm');

/**
 * worker model
 */
class Worker {
  /**
   * create new instance of worker model
   * @param {number} id id of a worker
   * @param {string} name worker's name
   * @param {number} age worker's age
   * @param {string} bio worker's biografi
   * @param {string} address worker's address
   * @param {string} photo url worker's photo
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
 * entity schema of worker model
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
