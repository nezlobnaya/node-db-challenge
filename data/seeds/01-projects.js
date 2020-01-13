
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').insert([
    {id: 1, project_name: 'Hackathon Demo', description: 'creating a Hackathon demo video', completed: false },
    {id: 2, project_name: 'Team Build', description: 'creating and building a team of devs for a Hackathon project', completed: false },
  ]);
};

