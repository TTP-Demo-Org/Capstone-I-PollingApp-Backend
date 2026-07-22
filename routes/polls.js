const express = require("express")
const { Poll , Option } = require("../models")

const router = express.Router()

router.post("/" , async (req, res, next) => {
    const {title, description, options} = req.body

    if (!title) {
        return res.status(400).json({error: "Title is needed!"})
    }

    if (!Array.isArray(options)) {
        return res.status(400).json({error: "Options need to be an array!"})
    }

    if (options.length < 2) {
        return res.status(400).json({error: "At least 2 options are needed!"})
    }

    try {
        const poll = await Poll.create({
            title : title,
            description : description,
        })
    
        const createdOptions = []
    
        for(const optionText of options){
            const option = await Option.create({
                text: optionText,
                pollId: poll.id
            })
            createdOptions.push(option)
        }
        return res.status(201).json({ poll, options: createdOptions })
    } catch (error) {
        next(error)
    }
})

module.exports = router
