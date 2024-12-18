const express = require("express");
const router = express.Router();
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { check, validationResult } = require('express-validator');
 
// @route GET api/profile/me
// @desc Get current user's profile
// @access Private
router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            return res.status(400).json({ msg: "There is no profile for this user" });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required").not().isEmpty(),
            check("skills", "Skills is required").not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build Profile Object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(",").map(skill => skill.trim());
        }

        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            // Check if the profile already exists
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                // Update the existing profile
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }

            // Create a new profile if none exists
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);


// @route POST api/profile
// @desc Get all profile
// @access Public

router.get("/", async (req, res) => {
    try {
        const profiles=await Profile.find().populate("user",["name","avatar"]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route POST api/profile/user/:user_id
// @desc Get all profile by user ID
// @access Public

router.get("/user/:user_id", async (req, res) => {
    try {
        const profile=await Profile.findOne({ user: req.params.user_id }).populate("user",["name","avatar"]);

        if(!profile) return res.status(400).json({msg:"Profile not found"});
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind=="ObjectId") {
            return res.status(400).json({msg:"Profile not found"});
        }
        res.status(500).send("Server Error");
    }
});

// @route DELETE api/profile
// @desc Delete profile, user, and posts
// @access Private
router.delete("/", auth, async (req, res) => {
    try {
        //Remove Posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndDelete({ user: req.user.id });

        // Remove user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: "User and profile deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route PUT api/profile/experience
// @desc Add Profile experience
// @access Private
router.put("/experience",
    [
        auth,
        [
            check("title","Title is required").not().isEmpty(),
            check("company","Company is required").not().isEmpty(),
            check("from","From date is required").not().isEmpty()
        ]
    ],
    async (req,res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }=req.body;

        const newExp={
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile=await Profile.findOne({ user: req.user.id });

            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);
// @route Delete api/profile/experience/:exp_i
// @desc Delete experience from Profile 
// @access Private
router.delete("/experience/:exp_id", auth, async(req,res) => {
    try {
        const profile=await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex=profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route PUT api/profile/education
// @desc Add Profile education
// @access Private
router.put("/education",
    [
        auth,
        [
            check("school","School is required").not().isEmpty(),
            check("degree","Degree is required").not().isEmpty(),
            check("fieldofstudy","Field of study is required").not().isEmpty(),
            check("from","From date is required").not().isEmpty()
        ]
    ],
    async (req,res) => {
        const errors=validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }=req.body;

        const newEdu={
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile=await Profile.findOne({ user: req.user.id });

            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);
// @route DELETE api/profile/education/:edu_id
// @desc Delete education from Profile 
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        if (removeIndex === -1) {
            return res.status(404).json({ msg: "Education entry not found" });
        }

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route Get api/profile/github/:username
// @desc user repos from Github
// @access Public

router.get("/github/:username", (req,res) => {
    try {
        const options = {
            uri: `
            https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
            method: "GET",
            headers: { "user-agent": "node.js" }
        };
        // Make a GET request to the GitHub API
        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github profile found" });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;