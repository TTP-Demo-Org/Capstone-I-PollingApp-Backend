const express = require("express");
const { Poll, Option, Vote } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allPolls = await Poll.findAll({ order: [["updatedAt", "DESC"]] });
    res.status(200).json(allPolls);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/vote", async (req, res, next) => {
  try {
    const pollId = Number(req.params.id);
    const { optionId } = req.body;

    const email = req.body.email?.trim().toLowerCase();

    if (!optionId) {
      return res.status(400).json({
        error: "Please select an option.",
      });
    }

    if (!email) {
      return res.status(400).json({
        error: "Please enter your email.",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(!emailPattern.test(email)){
      return res.status(400).json({error: "Please enter a valid email address."})
    }

    const option = await Option.findOne({
      where: {
        id: optionId,
        pollId: pollId,
      },
    });

    if (!option) {
      return res.status(404).json({ error: "Option not found for this poll!" });
    }

    const existingVote = await Vote.findOne({
      where: {
        email,
        pollId,
      },
    });

    if (existingVote) {
      return res.status(409).json({
        error: "This email has already voted in this poll.",
      });
    }

    const vote = await Vote.create({
      optionId,
      email,
      pollId,
    });

    return res.status(201).json(vote);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const pollId = Number(req.params.id);
    const singlePoll = await Poll.findByPk(pollId, {
      include: [
        {
          model: Option,
          include: [Vote],
        },
      ],
    });

    if (!singlePoll) {
      return res.status(404).json({ error: "Poll not found!" });
    }

    const pollData = singlePoll.toJSON();

    // console.log(">>>", pollData);
    // Options is added to the pollData object that sequelize returns because of include Option ^
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    for (const option of pollData.Options) {
      // creating a voteCount key on the option element from the array and setting it to length of Votes array
      //   on the frontend
      option.voteCount = option.Votes.length;
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    pollData.Options.sort((a, b) => a.id - b.id);
    
    res.status(200).json(pollData);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, description, options } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is needed!" });
  }

  if (!Array.isArray(options)) {
    return res.status(400).json({ error: "Options need to be an array!" });
  }

  if (options.length < 2) {
    return res.status(400).json({ error: "At least 2 options are needed!" });
  }

  try {
    const poll = await Poll.create({
      title: title,
      description: description,
    });

    const createdOptions = [];

    for (const optionText of options) {
      const option = await Option.create({
        text: optionText,
        pollId: poll.id,
      });
      createdOptions.push(option);
    }
    // make Options capital because that's what sequelize will do when you use "include: Option" for a single Poll
    return res.status(201).json({ poll, Options: createdOptions });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
