const express = require('express');
const router = new express.Router();

router.use(express.static("../src"));

module.exports=router;