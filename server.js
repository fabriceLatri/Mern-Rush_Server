const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = ['http://localhost:8080','https://104.198.14.52', 'http://localhost:3000', 'https://rush-mern-fab.netlify.com'];
app.use(cors({
    origin: function(origin, callback) {
        if (!origin)
            return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not allow acces from specified origin.';
            return(callback(new Error(msg), false));
        }

        return(callback(null, true));
    }
}));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// Test route
app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
