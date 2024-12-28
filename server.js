const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('YOUR_MONGODB_ATLAS_URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Add a new patient
app.post('/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all patients
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
