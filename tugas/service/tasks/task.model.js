/** @module taskSchema */
// eslint-disable-next-line no-unused-vars
const { EntitySchema, Timestamp } = require('typeorm');

/**
 * model pekerjaan
 */
class Task {
  /**
   * Membuat object baru berdasarkan model pekerjaan
   * @param {number} id id dari pekerjaan
   * @param {string} job nama pekerjaan
   * @param {number} assignee id pekerja yang ditugaskan
   * @param {boolean} done status diselesaikan
   * @param {boolean} cancelled status dibatalkan
   * @param {string} attachment nama file lampiran pekerjaan
   * @param {Timestamp} addedAt tanggal data dibuat
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
 * Membuat skema dari model pekerjaan
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
