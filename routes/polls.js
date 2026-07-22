const express = require("express")
const { Poll , Option , Vote} = require("../models")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const allPolls = await Poll.findAll({order: [['createdAt', 'DESC']]})
        res.status(200).json(allPolls)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const pollId = Number(req.params.id)
        const singlePoll = await Poll.findByPk(pollId, {
            include: [
                {
                    model: Option,
                    include: [Vote]
                }
            ]
        })

        if(!singlePoll){
            return res.status(404).json({error: "Poll not found!"})
        }

        const pollData = singlePoll.toJSON()

        for(const option of pollData.Options) {
            option.voteCount = option.Votes.length
        }

        pollData.Options.sort((a, b) => b.voteCount - a.voteCount)

        res.status(200).json(pollData)
    } catch (error) {
        next(error)
    }
})

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
