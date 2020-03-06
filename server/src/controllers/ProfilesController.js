const User = require('../models').User
const Tag = require('../models').Tag
const UsersTag = require('../models').UsersTag

module.exports = {
  async retrieve (req, res){
    try {
      user = await User.findOne({
        where: {
          id: req.query.id
        }
      })
      res.send(user)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        err: 'an error has occurred trying to fetch the user'
      })
    }
  }, 

  async register(req, res){
    try {
      console.log(req.body);
      user = await User.create(req.body);
      
      for (var i = 0; i < req.body.tag_ids.length; i++){
        var tag = await Tag.findOne({
          where:{
            id : req.body.tag_ids[i]}});
        const uid_tid = {
          UserId: user.id,
          TagId: req.body.tag_ids[i]
        }
        console.log(uid_tid)
        const saved_uid_tid = await UsersTag.create(uid_tid)
      }
      res.send({user: user.toJSON()})
    } catch (err) {
      console.log(err);
      res.status(500).send({
        err: 'an error has occurred trying to register the user'
      })
    }
  },

  async tags(req, res) {
    try {
      tags = await Tag.findAll({})
      res.send(tags)
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: 'an error has occurred trying to fetch tags'
      })
    }
  },

  async update_profile (req, res){
    try{
      const user = await User.findOne({where: {
        id: req.body.id
      }})
      user.utorid=req.body.utorid;
      user.first_name=req.body.first_name;
      user.last_name=req.body.last_name;
      user.bio=req.body.bio;
      user.major=req.body.major;
      user.year=req.body.year;
      user.description=req.body.description;
      await user.save();
      res.send(user.toJSON())
    } 
    catch (err) {
      console.log(err);
      res.status(500).send({
        err: 'an error has occurred trying to update the user'

      })
    }
  }

}
