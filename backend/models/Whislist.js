const mongoose = require("mongoose");

const WhislistSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        products: [{type: String}],
        quantity: {type: Number, default: 0}
    },
    {timestamps: true}
)

module.exports = mongoose.model("Whislist", WhislistSchema);
