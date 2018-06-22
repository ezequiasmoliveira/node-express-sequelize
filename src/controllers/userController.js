
const models = require('./../models/index');

// busca de usuários
exports.get = (req, res, next) => {  
  return (req.params.id ? models.user.findById(req.params.id) : models.user.findAll())
    .then(user => {
      res.json(user);
    }).catch(err => {
      req.log.error(err)
  });
};

// criar usuário
exports.create = (req, res, next) => {
  models.user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(user => {
      res.status(201).json(user);
  }).catch(err => {
    req.log.error(err)
  });
};

// atualiza o usuário
exports.update = (req, res, next) => {
  models.user.update({
    name: req.body.name
  }, {
    where: {
      id: req.params.id
    }
  }).then(user => {
      res.status(200).json(user);
  }).catch(err => {
    req.log.error(err)
  });
};

// deleta o usuário
exports.delete = (req, res, next) => {
  models.user.destroy({
    where: {
      id: req.params.id
    }
  }).then(user => {
    res.status(200).json(user);
  }).catch(err => {
    req.log.error(err)
  });
};

