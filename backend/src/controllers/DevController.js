const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json({ 
      ok: true,
      devs,
    });
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude, } = req.body;
    console.log(`> username: ${github_username} / techs: ${techs}`);

    let newDev = await Dev.findOne({ github_username });

    if (!newDev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      console.log(apiResponse.data);

      const { name = login, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      newDev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
    }

    return res.status(201).json({
      ok: true,
      dev: newDev,
    });
  },

  async update(req, res) {
    console.log(req.body);
    console.log(req.params);

    const { _id } = req.params;
    const { github_refresh = false, github_username, techs, latitude, longitude, } = req.body; 

    const techsArray = parseStringAsArray(techs);

    const location = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const dev = await Dev.findById(_id);

    if (github_refresh) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
      const { name = login, avatar_url, bio } = apiResponse.data;

      dev.name = !name ? dev.name : name;
      dev.avatar_url = !avatar_url ? dev.avatar_url : avatar_url;
      dev.bio = !bio ? dev.bio : bio;
    }

    try {
      await dev.save();
    } catch (e) {
        return res.status(400).json({
          ok: false,
          error: e,
        });
    }

    return res.status(200).json({
      ok: true,
      dev,
    });
  },

  async destroy(req, res) {
    const { _id } = req.params;

    try {
      const dev = await Dev.findById(_id);
      dev.deleteOne();
      //const dev = await Dev.deleteOne( Dev.findById(_id) );
      //await Dev.deleteOne( dev );
      
      return res.status(200).json({
        ok: true,
        dev,
      });
    } catch (e) {
      return res.status(400).json({
        ok: false,
        error: e,
      });
    }    
  },
};
