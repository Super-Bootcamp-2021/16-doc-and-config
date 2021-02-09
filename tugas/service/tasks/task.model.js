/**@module Service_TaskModel */

const { EntitySchema } = require('typeorm');

class Task {
  /**
   * create new instance of todo model
   * @property {number} id id of a task
   * @property {string} job job of a task
   * @property {boolean} done true when task are finished
   * @property {boolean} cancelled true when task are canceled
   * @property {date} addedAt now()
   * @property {string} attachment of a task
   * @property {number} assignee id of worker that have a realtionship with task
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
 * enty schema of task model
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
