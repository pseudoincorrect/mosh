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
  .find()
  .or({tags: {$in: ["backend", "frontend"]}})
  .and({isPublished: true})
  .sort({price: "descending"})
  .select({name: 1, author: 1, price: 1})
  .catch(err => console.log('Error', err.message));
}

async function run() {
  const courses = await getCourses();

  console.log("\r\nTotal courses: ", courses.length, "\r\n");

  for (let i = 0; i < courses.length; i++) {
    console.log("name: ", courses[i].name);
    console.log("author: ", courses[i].author);
    console.log("price: ", courses[i].price);
    console.log(" ");  
  }

    // console.log(courses);
    
    mongoose.disconnect()
}

run();
