const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express(); 
app.use(cors()); 
const PORT = process.env.PORT || 8005; 
const server = app.listen(PORT, () => {
  console.log(`Listening on port ::${PORT}`);
});

// Static Files
if(process.env.NODE_ENV==="production") {            
    app.use(express.static(path.join(__dirname,'client/build')));
    app.get("*", (req,res) => {
      res.sendFile(path.join(__dirname,"client/build","index.html"));
    });
  }