const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let createRecipe = Recipe.create({title: 'French Onion Soup', cuisine: 'French'})
    createRecipe.then((result) => {
        console.log(result)
    })
    .catch(()=> {
      console.log('Something went wrong with creating')
    })

    let getRecipes = Recipe.insertMany(data)
    getRecipes.then((result) => {
      result.forEach((elem)=> {
        console.log(elem, title)
      })
    })
    .catch(()=> {
        console.log('Insert went wrong')
    })

    Promise.all([createRecipe, getRecipes])
    .then(()=> {
      let updateRecipe = Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'} , {duration: 100})
          updateRecipe
          .then(() => {
          console.log('Updated successfully!')
          })
          .catch(()=> {
              console.log('Something went wrong while udpating')
          })

          let deleteRecipe = Recipe.deleteOne({title: 'Carrot Cake'})
          deleteRecipe
          .then(() => {
            console.log('deleted successfully!')
          })
          .catch(()=> {
            console.log('Something went wrong while deleting')
          })
        })
    
        Promise.all([updateRecipe, deleteRecipe])
        .then(()=> {
          mongoose.connection.close()
        })
        .catch(()=> {
          console.log('Something went wrong while closing the connection')
        })

    .catch(()=> {
      console.log('Something went wrong while promising')
    })
  
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
