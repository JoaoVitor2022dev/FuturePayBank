const express = require("express"); 
const router = express(); 

// rotes test
router.get("/", (req, res) => {
   res.send("API Working!")
})

module.exports = router