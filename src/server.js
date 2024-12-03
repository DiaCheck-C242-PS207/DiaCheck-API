//Bagian untuk Import
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const historyRoutes = require('./routes/histories');
const articleRoutes = require('./routes/article');
const middlewereLogRequest = require ('./middlewere/logs');



//Bagian Isi untuk memanggil
app.use(middlewereLogRequest);
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Get Access Back-End API',
    });
  });

app.use('/users', userRoutes );
app.use('/histories', historyRoutes);
app.use('/articles', articleRoutes);


app.listen(PORT,() =>{
    console.log(`server berjalan di ${PORT}`);
})
 