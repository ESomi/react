// Import Express and Router
var express = require('express');
var router = express.Router();

// Get
router.get('/', function(req, res) {
  res.render('index', {
	  title: 'Web Chat Window',
	  // lead: 'Insert your user name and start talk' 
    lead: '대화명을 입력하고 대화를 시작하세요' 
  });
});

module.exports = router;
