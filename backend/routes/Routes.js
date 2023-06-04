const express = require("express"); 
const router = express(); 

// routers controler 
router.use("/api/users", require("./UserRoutes"));

// rotes test
router.get("/", (req, res) => {
   res.send("API Working!")
})

module.exports = router