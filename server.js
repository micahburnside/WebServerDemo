//Checks for Development or Production Environment
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

//Configures View Engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// MONGOOSE Connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
useNewURLParser: true })
const db = mongoose.connection

//MongoDB Config
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))    

app.use('/', indexRouter)


// Catch-all error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes

    // Send a response with error information
    res.status(500).json({
        error: {
            message: err.message, // Basic error message
            name: err.name, // Type of error
            stack: err.stack // Stack trace for debugging (optional)
        }
    });
});


//Server PORT
app.listen(process.env.PORT || 3000);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
