const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
  return await Course
    .find({isPublished: true})
    .or([
        {name: /.*by.*/ } ,
        {price: {$gte: 15}}
    ])
    .sort({price: "ascending"})
    .select({name: 1, price: 1})
    .catch(err => console.log('Error', err.message));
}

async function run() {
  const courses = await getCourses();

  if (courses && courses.length!=0){
    console.log("\r\nTotal courses: ", courses.length, "\r\n");

    for (let i = 0; i < courses.length; i++) {
      console.log("name: ", courses[i].name);
      console.log("price: ", courses[i].price);
      console.log(" ");  
    }
  }
  else {
      console.log("no courses catched");
      
  }


    // console.log(courses);
    
    mongoose.disconnect()
}

run();
