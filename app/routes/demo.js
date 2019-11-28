module.exports = app => {
  const demo = require('../controllers/demoController.js');

  // Create a new demo
  app.post('/demo', demo.create);

  // Retrieve all demo
  app.get('/demo', demo.findAll);

  // Retrieve a single demo with demoId
  app.get('/demo/:demoId', demo.findOne);

  // Update a demo with demoId
  app.put('/demo/:demoId', demo.update);

  // Delete a demo with demoId
  app.delete('/demo/:demoId', demo.delete);
};
