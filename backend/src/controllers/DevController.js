const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const {
      github_username, techs, latitude, longitude,
    } = req.body;
    console.log(`> username: ${github_username} / techs: ${techs}`);

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      console.log(apiResponse.data);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return res.json({
      message: 'ok',
      dev,
    });
  },

  async update(req, res) {
    console.log(req.body);

    return res.json({
      message: 'ok',
    });
  },

  async destroy(req, res) {
    console.log(req.body);

    return res.json({
      message: 'ok',
    });
  },
};
