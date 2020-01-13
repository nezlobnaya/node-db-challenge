
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').insert([
    {id: 1, name: 'laptop', description: 'having a laptop in place' },
    {id: 2, name: 'Lambda student', description: 'a soon to be hired developer' },
    {id: 3, name: 'Zoom app', description: 'having a Zoom app installed' },
    {id: 4, name: 'working prototype', description: 'having done the MVP for the project' },
    {id: 5, name: 'project lead', description: 'assigning a PL role to a dev' },
  ]);
};
