const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "maneger"],
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  //Hash the password only if it is has been modified(or is new)
  if (!person.isModified("password")) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //override the plain password with th hashed one
    person.password = hashedPassword;
    next();
  } catch (err) {}
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //Use bcrypt to compare the provided password with the hashed password
    const isMatch=await bcrypt.compare(candidatePassword,this.password);
    return isMatch;
  }
   catch (err) {
    throw err;
  }
};

const Person = mongoose.model("Person", personSchema);
module.exports = Person; //Export Person module
