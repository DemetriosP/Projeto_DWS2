const Whislist = require("../models/Whislist");
const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
    const newWhislist = new Whislist(req.body)
    try {
        const savedWhislist = await newWhislist.save();
        res.status(200).json(savedWhislist);
    } catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updateWhislist = await Whislist.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updateWhislist);
    } catch (err) {
        res.status(500).json(err);
    }
})

//delete
router.delete("/:id", async (req, res) => {
    try {
        await Whislist.findByIdAndDelete(req.params.id);
        res.status(200).json("Lista de desejaos foi deletada");
    } catch (err) {
        res.status(500).json(err);
    }
})

//GET USER WHISLIST
router.get("/find/:username", async (req, res) => {
    try {
        const whislist = await Whislist.findOne({username: req.params.username});
        res.status(200).json(whislist);
    } catch (err) {
        res.status(500).json(whislist);
    }
});

//GET ALL
router.get("/", async (req, res) => {
    try {
        const whislists = await Whislist.find();
        res.status(200).json(whislists);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router
