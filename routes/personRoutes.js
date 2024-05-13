const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

//post route to add person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the req body contains the person data(it contain data from bodyParser)

    //create new Person document using the mongoose model
    const newPerson = new Person(data);

    //save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract work type from the url parameter
    if (workType == "chef" || workType == "waiter" || workType == "maneger") {
      const response = await Person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json({ response });
    } else {
      res.status(404).json({ error: "Invalid worktype" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract id from url parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return updated data
        runValidators: true, //  Run mongoose validation
      }
    )
    if (!response) {
      return res.status(404).json({ error: "ID not found" });
    }
    console.log("data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.delete("/:id",async(req,res)=>{
   try{
    const personId = req.params.id; //extract id from url parameter
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
        return res.status(404).json({ error: "ID not found" });
      }
      console.log("data deleted");
      res.status(200).json({message:"person deleted successfully"});
   }
   catch(err){
    console.log(err);
    res.status(500).json({ error: "Internal server Error" });
   }


})
module.exports = router;
