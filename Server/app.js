const express = require('express');
const fs = require('fs');
const path = require('path');

var app = express();

const uploadsDir = path.join(__dirname, 'public','uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('Created uploads directory');
}

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const initializeDatabase = require('./utils/initializeDatabase');

require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
    initializeDatabase().catch(console.error);
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});;


app.use(express.static(path.join(__dirname, 'public')));
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));


const videos = require('./routes/videosRoutes');
app.use('/api/videos', videos);

const comments = require('./routes/commentsRoutes');
app.use('/api/comments', comments);

const users = require('./routes/usersRoutes');
app.use('/api/users', users);

const token = require('./routes/tokenRoutes');
app.use('/api/token', token);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT
app.listen(PORT, async () => {
    const { default: open } = await import('open');
  open(`http://localhost:${PORT}`);
});

