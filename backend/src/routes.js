const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/', (req, res) => res.json({ message: `Fala Dev! :D -- Esse é o projeto ${process.env.APP_NAME} da Semana OmniStack#10` }));

routes.get('/devs', DevController.index);
routes.get('/search', SearchController.index);
routes.post('/devs', DevController.store);
routes.put('/devs/:_id', DevController.update);
routes.delete('/devs/:_id', DevController.destroy);

module.exports = routes;
