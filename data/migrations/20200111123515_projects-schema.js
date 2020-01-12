
exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
          tbl.increments();
          tbl.string('project_name', 128).unique().notNullable();
          tbl.text('description', 280);
          tbl.boolean('completed').defaultTo(false)
      })
      .createTable('tasks', tbl => {
          tbl.increments();
          tbl.text('description', 280).unique().notNullable();
          tbl.text('notes', 280);
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('projects')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.boolean('completed').defaultTo(false)
      })
      .createTable('resources', tbl => {
          tbl.increments();
          tbl.string('name', 128).unique().notNullable();
          tbl.text('description', 280);
      })
      .createTable('projects_resources', tbl => {
          tbl.integer('project_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('projects')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.integer('resource_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('resources')
              .onUpdate('CASCADE')
              .onDelete('CASCADE')
          tbl.primary(['project_id', 'resource_id'])
      })
      .createTable('contexts', tbl => {
        tbl.increments();
        tbl.string('name', 128).unique().notNullable();
    })
    .createTable('tasks_contexts', tbl => {
        tbl.integer('task_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('tasks')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.integer('context_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('contexts')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
        tbl.primary(['task_id', 'context_id'])
    })
  }
  exports.down = function(knex) {
    return knex.schema

      .dropTableIfExists('tasks_contexts')
      .dropTableIfExists('contexts')
      .dropTableIfExists('projects_resources')
      .dropTableIfExists('resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('projects')
  };
  