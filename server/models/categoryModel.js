const mongoose = require('mongoose')

// Create a schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectID,
        ref: "Product"
    }]
}, {
    timestamps: true
})

// Create a model
const Category = mongoose.model("Categories",CategorySchema);

module.exports = Category;