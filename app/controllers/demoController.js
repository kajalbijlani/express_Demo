const Demo = require('../models/demo.js');

exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(400).send({
      message: 'content can not be empty'
    });
  }
  const createDemo = new Demo({
    title: req.body.title,
    content: req.body.content
  });
  createDemo
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'something went wrong to create'
      });
    });
};

exports.findAll = (req, res) => {
  Demo.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'error occurred while retrieve data'
      });
    });
};

exports.findOne = (req, res) => {
  Demo.findById(req.params.demoId)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: 'single demo not found' + req.params.demoId
        });
      }
      res.send(data);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Demo not found with id ' + req.params.demoId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving demo with id ' + req.params.demoId
      });
    });
};

exports.update = (res, req) => {
  if (!req.body.content) {
    return res.status({
      message: 'content can not be empty'
    });
  }
  Demo.findByIdAndUpdate(
    req.params.demoId,
    {
      title: req.body.title || 'untitled demo',
      content: req.body.content
    },
    { new: true }
  )
    .then(data => {
      if (!data) {
        return res.status({
          message: 'demo data Demo found with Id' + req.params.demoId
        });
      }
      res.send(data);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status({
          message: 'demo data Demo found with Id' + req.params.demoId
        });
      }
      return res.status(500).send({
        message: 'Error updating demo with id ' + req.params.demoId
      });
    });
};

exports.delete = (req, res) => {
  Demo.findByIdAndRemove(req.params.demoId)
    .then(data => {
      if (!data) {
        return res.status(404).send({
          message: 'Demo not found with id ' + req.params.demoId
        });
      }
      res.send({ message: 'Demo deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Demo not found with id ' + req.params.demoId
        });
      }
      return res.status(500).send({
        message: 'Could not delete Demo with id ' + req.params.demoId
      });
    });
};
