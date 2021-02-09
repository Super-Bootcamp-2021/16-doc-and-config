/** @module todoSchema */

const { EntitySchema } = require('typeorm');

/**
 * todo model
 */
class Todo {
  /**
   * create new instance of todo model
   * @param {string} id id of a todo
   * @param {string} task task description
   * @param {boolean} done true when task are done
   */
  constructor(id, task, done) {
    this.id = id;
    this.task = task;
    this.done = done;
  }
}

/**
 * enty schema of todo model
 */
const TodoSchema = new EntitySchema({
  name: 'Todo',
  target: Todo,
  tableName: 'todos',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    task: {
      type: 'varchar',
      length: 255,
    },
    done: {
      type: 'boolean',
      default: false,
    },
  },
});

module.exports = {
  Todo,
  TodoSchema,
};
