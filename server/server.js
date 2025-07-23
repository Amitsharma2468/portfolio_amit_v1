const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Models
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  liveLink: String,
  codeLink: String,
  technologies: [String],
}, { timestamps: true });

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
  link: String,
  date: Date,
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'unread' }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);
const Contact = mongoose.model('Contact', contactSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin login
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Unauthorized email' });
    }

    let admin = await Admin.findOne({ email });

    if (!admin) {
      const hashedPassword = await bcryptjs.hash('htens20@', 10);
      admin = new Admin({ email, password: hashedPassword });
      await admin.save();
    }

    const isValid = await bcryptjs.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET);
    res.json({ token, admin: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CRUD helper
const createCRUDRoutes = (model, routeName) => {
  app.get(`/api/${routeName}`, async (req, res) => {
    try {
      const items = await model.find().sort({ createdAt: 1 });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  app.post(`/api/${routeName}`, auth, async (req, res) => {
    try {
      const item = new model(req.body);
      await item.save();
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: 'Validation error', error: error.message });
    }
  });

  app.put(`/api/${routeName}/:id`, auth, async (req, res) => {
    try {
      const item = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ message: 'Update error', error: error.message });
    }
  });

  app.delete(`/api/${routeName}/:id`, auth, async (req, res) => {
    try {
      const item = await model.findByIdAndDelete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Delete error', error: error.message });
    }
  });
};

// Enabled Models Only
createCRUDRoutes(Project, 'projects');
createCRUDRoutes(Achievement, 'achievements');

// Contact routes
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error sending message', error: error.message });
  }
});

app.get('/api/contact', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/contact/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Update error', error: error.message });
  }
});

app.delete('/api/contact/:id', auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete error', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
