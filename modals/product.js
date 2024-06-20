const mongoose = require('mongoose');

const {Schema} = mongoose;


const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type:Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    properties: { 
        type: Map, 
        of: Schema.Types.Mixed 
      },
    
},{
    timestamps: true
},{
    indexes: [
        { name: 'text' }
    ]
});

const Product = mongoose.model('Product', productSchema)

module.exports = Product