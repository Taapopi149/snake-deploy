const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('/', async (req , res) => {
    try {
        const {name} = req.body;
         
        let user = await User.findOne({name})

        if (!user) {
        user = new User({name})         
        await user.save();
        res.status(201).json(user);
        } else {
          return res.status(200).json({message: 'User exists', user})  
        }

    }catch (err) {
        res.status(400).json({ error: err.message})
    }


})

//Update
router.put('/score', async(req, res) =>{
    try {
        const {name, score} = req.body

        if (!name || score === undefined) {
            return res.status(400).json({ error: 'Name and score are required' })
        }

        const user = await User.findOneAndUpdate(
            {name},
            {$set : {score} },
            {new: true}
        )

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        res.status(200).json({message: "Score Updated", user})

    } catch (error) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }); 
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




module.exports = router;