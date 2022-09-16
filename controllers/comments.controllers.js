const Comment = require("../models/Сomment.model");

module.exports.commentControllers = {
  addComment: async (req, res) => {
   try {
    const { comment, movie, user } = req.body;
    const data = await Comment.create({
      comment,
        movie,
        user
    })
    const result = await data.populate("user")
    res.json(result);
   } catch (error) {
    return res.status(400).json(error.toString())
   }
  },


  getComment: async (req, res) => {
    const data = await Comment.find().populate('user');
    res.json(data)
  },

  deleteComment: async (req, res) => {
   const data = await Comment.findByIdAndDelete(req.params.id);
    res.json('удалено');
  },
}
