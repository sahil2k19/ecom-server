const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./modals/product');
const Category = require('./modals/category');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sahilgagan227:sahilgagan@cluster0.yrnpcoc.mongodb.net/myapp', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// creating controller

// get categories

app.get('/category', async(req,res)=>{
    try {
        const categories = await Category.find();
        return res.status(200).send({
            message: 'Categories fetched successfully',
            result: categories
        })    
    } catch (error) {
        return res.status(500).send({error})
    }
})

// create product

app.post('/product', async(req,res)=>{
    const body = req.body;
    try {
        const product = await new Product(body);
        await product.save();
        return res.status(200).send({
            message: 'Product created successfully',
            result: product
        });
    } catch (error) {
        return res.status(500).send({error})
    }
})

// get all product

app.get('/product', async(req,res)=>{
    try {
        const products = await Product.find().populate('category');
        return res.status(200).send({
            message: 'Products fetched successfully',
            result: products
        });
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
})

// get single product

app.get('/product/:id', async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        return res.status(200).send({
            message: 'Product fetched successfully',
            result: product
        });
    } catch (error) {
        return res.status(500).send({error})
    }
})  

// update product

app.put('/product/:id', async(req,res)=>{
    const {id} = req.params;
    const body = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).send({
            message: 'Product updated successfully',
            result: product
        });
    } catch (error) {
        return res.status(500).send({error})
    }
})

// delete product

app.delete('/product/:id', async(req,res)=>{
    const {id} = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);
        return res.status(200).send({
            message: 'Product deleted successfully',
           
        });
    } catch (error) {
        return res.status(500).send({error})
    }
})

// search product
app.get('/product/search', async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Product.find(
            { $text: { $search: query } },
            { score: { $meta: "textScore" } }
        ).sort(
            { score: { $meta: "textScore" } }
        ).populate('category');

        return res.status(200).send({
            message: 'Products searched successfully',
            result: products
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
  
    

app.listen(2100, () => console.log('Listening on port 2100'));

