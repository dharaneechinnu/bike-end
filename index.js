require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT|| 3500;
const MONGODB_URL = process.env.MONGO_URL
const Bike = require('./Model/BikeList')
mongoose.connect(MONGODB_URL)
  .then(() => {
     console.log('Database is connected');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });
  
app.use(cors())
app.use(express.json())

app.use('/Auth',require('./Route/AuthRoute'))
app.use('/doc',require('./Route/OwnerRouter'))

app.post('/api/addBike', async (req, res) => {
  const { userid, brand, model, price, imgs, location, shopName,phonenumber } = req.body.newBike;
  try {
    // Create a new bike instance
    const bike = new Bike({
      userid,
      brand,
      model,
      price,
      imgs,
      location,
      shopName,
      phonenumber
    });

    // Save the bike to the database
    await bike.save();

    // Send a success response with the saved bike data
    res.status(200).json(bike);
  } catch (error) {
    console.error('Error adding bike:', error);
    // Send an error response if there's an internal server error
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/userBikes/:userId', async (req, res) => {
  try {
      const userId = req.params.userId;
      const bikes = await Bike.find({ userid: userId });
      res.json(bikes);
  } catch (error) {
      console.error('Error fetching user bikes:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a bike
app.delete('/api/deleteBike/:bikeId', async (req, res) => {
  try {
      const bikeId = req.params.bikeId;
      await Bike.findByIdAndDelete(bikeId);
      res.sendStatus(200); // Send success response
  } catch (error) {
      console.error('Error deleting bike:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}); 


/*ViewAllBike */
app.get('/api/bikes', async (req, res) => {
  try {
      const bikes = await Bike.find(); // Retrieve all bikes from the database
    const print =  res.status(200).json(bikes); // Send the bikes as JSON response
    console.log(print)
  } catch (error) {
      console.error('Error fetching bikes:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


  app.listen(PORT,() =>{
  
    console.log('Server is Running...');
  })

  