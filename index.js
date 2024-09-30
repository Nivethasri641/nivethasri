const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

    const mongoURI = "mongodb+srv://Nivethasri:Nive@123@cluster0.ifpwg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
connect (mongoURI, { useNewUrlParse: true, useUndefineTopology: true})
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.error("MongoDB connection error: ",err));
const itemSchema = new mongoose.Schema({
    Student_name:{ type: String, required: true },
});
const Item = mongoose.model("Item",itemSchema);
    app.get("/item", async (req, res) => {
        try{
            const items = await Item.find();
            res.json(items);
        } catch (err) {
            res.status(500).json({
                error: err.message
            });
        }
    });
    app.post("/items", async (req, res) => {
        const newItem = new Item ({
            name: req.body.name
        });
        try {
            const savedItem = await newItem.save();
            res.json(savedItem);
        }catch (err){
            res.status(500).json({
                error:err.message
            });
        }
    });

    app.put("/items/:id", async(reg, res => {
        try{
        const updatedItem =  Item.findByIdAndUpdate(
                req.params.id,
                { name: req.body.name 
                },{new: true},
            );
            res.json(updatedItem);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }));
    app.delete("/items/:id", async (req, res) => {
        try {
            await Item.findByIdAndDelete(req.params.id);
            res.json({
                success:true
            });
        }catch (err){
            res.status(500).json({
                error: err.message 
            });
        }
    });
    app.listen(port, () => {
        console.log('Server running on port ${port}');
    });