//Checks for Development or Production Environment

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
