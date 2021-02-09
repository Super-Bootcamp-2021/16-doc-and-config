const { EntitySchema } = require('typeorm');

/**
 * worker model
 */
class Worker {
  /**
   * 
   * @param {number} id 
   * @param {string} name 
   * @param {number} age 
   * @param {string} bio 
   * @param {string} address 
   * @param {string} photo 
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
