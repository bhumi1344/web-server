const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

async function connectDB(){
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected')

}
    

connectDB();

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String
});

const Product = mongoose.model('Product',productSchema);

//post-create
app.post('/product', async (req, res)=>{
    await Product.create(req.body)
    res.send('product added successfully')

});

//get-read
app.get('/product',async (req, res)=>{
   const products = await Product.find();
   res.send(products);

});
//put-update
app.put('/product/:id', async (req,res)=>{
    console.log(req.params.id)
    await Product.updateOne({_id: req.params.id},req.body);
    res.send('product updated successfully')


});

app.delete('/product/:id', async (req,res)=>{
    await Product.findByIdAndDelete({_id: req.params.id});
    res.send('product deleted successfully')

    
});

app.listen(process.env.PORT, 'localhost', ()=>{
    console.log('server is started on port 3000');
});

//password-Hwxeq4QCdk9ITfHK