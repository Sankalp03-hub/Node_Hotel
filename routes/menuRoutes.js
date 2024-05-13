const express=require('express');
const router=express.Router();
const MenuItem = require("./../models/MenuItem");




router.get("/", async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log("data fetched");
      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const response = await newMenu.save();
      console.log("data saved");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server Error" });
    }
  });

  router.get('/:tasteType', async (req, res) => {
    try {
      const tasteType = req.params.tasteType; //Extract work type from the url parameter
      if (tasteType == "sweet" || tasteType == "sour" || tasteType == "spicy") {
        const response = await MenuItem.find({ taste: tasteType });
        console.log("data fetched");
        res.status(200).json({ response });
      } else {
        res.status(404).json({ error: "Invalid tasteType" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal server Error" });
    }
  });

  router.put('/:id',async(req,res)=>{
    try{

        const menuId=req.params.id;
        const updatedMenuData=req.body;

        const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
            new:true,
            runValidator:true
        })

        if(!response){
            return res.status(404).json("MenuItem Not Found")
        }
        console.log("menu is updated")
        res.status(200).json(response)


    }
    catch(err){
        console.log(err)
        res.status(500).json("Internal server error")
    }
  })

  router.delete('/:id',async(req,res)=>{
    try{
        const menuId=req.params.id;

    const response=await MenuItem.findByIdAndDelete(menuId)

    if(!response){
        res.status(404).json("MenuItem is not found")
    }

    console.log("menu is deleted")
    res.status(200).json({message:"MenuItem deleted successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json("Internal server Erros")
    }

  })

  module.exports=router;