
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').insert([
    {id: 1, description: 'write a script', notes: 'create and write a step-by-step script', project_id: 1, completed: false},
    {id: 2, description: 'record screen', notes: 'do a test screen recording', project_id: 1, completed: false},
    {id: 3, description: 'invite candidates', notes: 'invite and pre-screen candidates', project_id: 2, completed: false},
    {id: 4, description: 'have an ice-breaker', notes: 'have an informal introductory meeting', project_id: 2, completed: false},
  ]);
};
