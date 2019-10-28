module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'START',
          duration: 1,
          price: 129.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
