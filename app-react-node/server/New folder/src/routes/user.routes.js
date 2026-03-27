const express = require("express");
const router = express.Router();
const User = require('../models/User');
const {authMiddleware} = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, async (_, res) => {
    try {
        res.json(await User.find());
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/', authMiddleware, async (req, res) => {
    res.json(await User.create(req.body));
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports = router;
