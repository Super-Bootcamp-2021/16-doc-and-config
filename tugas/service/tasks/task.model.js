const { EntitySchema } = require('typeorm');

/**
 * Task Model
 */
class Task {
  /**
   * create new instance of todo model
   * @param {number} id id of a task
   * @param {string} job job name
   * @param {boolean} done true when task is done
   * @param {boolean} cancelled true when task is cancelled
   * @param {Date} addedAt time of task created
   * @param {object} attachment task attachent's file
   * @param {number} assignee task relation with worker
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
 * entity schema of Task Model
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
