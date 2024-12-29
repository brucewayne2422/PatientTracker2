require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI; // Get MongoDB URI from .env
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Could not connect to MongoDB Atlas', err));

// Define Patient Schema
const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  ward: String,
  bed: String,
  admissionDate: String,
  diagnosis: String,
  plan: String,
  followUp: String,
  notes: String,
  doctor: String,
});

const Patient = mongoose.model('Patient', patientSchema);

// CRUD API Routes
app.post('/api/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send({ message: 'Failed to save patient', error });
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).send(patients);
  } catch (error) {
    res.status(500).send({ message: 'Failed to fetch patients', error });
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(patient);
  } catch (error) {
    res.status(500).send({ message: 'Failed to update patient', error });
  }
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Failed to delete patient', error });
  }
});

// Start Server
const PORT = process.env.PORT || 5000; // Get the port from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
