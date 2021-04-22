
exports.seed = function (knex) {
  return knex('dogs').insert([
    { dog_id: 1, dog_name: 'Monty' },
    { dog_id: 2, dog_name: 'Zusi' }
  ]);
};
