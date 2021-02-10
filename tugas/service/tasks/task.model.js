const { EntitySchema } = require('typeorm');

/**
 * task model
 */
class Task {
  /**
   * 
   * @param {number} id 
   * @param {string} job 
   * @param {object} assignee 
   * @param {boolean} done 
   * @param {boolean} cancelled 
   * @param {string} attachment 
   * @param {Date} addedAt 
   */
  constructor(id, job, assignee, done, cancelled, attachment, addedAt) {
    this.id = id;
    this.job = job;
    this.done = done;
    this.cancelled = cancelled;
    this.addedAt = addedAt;
    this.attachment = attachment;
    this.assignee = assignee;
  }
}

/**
 * entity schema task model
 */
const TaskSchema = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  target: Task,
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    job: {
      type: 'text',
    },
    done: {
      type: 'boolean',
      default: false,
    },
    cancelled: {
      type: 'boolean',
      default: false,
    },
    attachment: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    addedAt: {
      type: 'timestamp',
      name: 'added_at',
      nullable: false,
      default: () => 'NOW()',
    },
  },
  relations: {
    assignee: {
      target: 'Worker',
      type: 'many-to-one',
      onDelete: 'CASCADE',
    },
  },
});

module.exports = {
  Task,
  TaskSchema,
};
