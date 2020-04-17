const express = require('express');
const router = express.Router();
const https = require('https');

const Languages = require("../models/languages");

var gitSearch =  (code) => {

    return new Promise( (resolve, reject) => {

        const options = {
            host: 'api.github.com',
            path: `/search/repositories?q=language:${code}`,
            method: 'GET',
            headers: {'user-agent': 'node.js'}
        };

        var request = https.request(options, function(response){
            var body = '';
            response.on("data", function(chunk){
                body += chunk.toString('utf8');
            });
            
            response.on("end", function(){
                resolve(JSON.parse(body))
            });
        });
            
        request.end();
    });
}

router.get('/codes/', (req, res) => {
    Languages.find({}, 'code', (error, result) => {
      if (error) { console.error(error); }

	  res.json({data: result})
    })
})

router.get('/repos/', (req, res) => {
    gitSearch(req.query.search).then((result) => {
        res.json(result)
    })
})

router.post('/', (req, res) => {
	Languages.create({
		code: req.query.code
	  }, function(err, language){
		if(err) {
			res.status(500).send('Não foi possível criar.');
		}
		res.json(language)
	  })
})

router.delete('/:id', (req, res) => {
	Languages.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json('Linguagem deletada!');
    })
})

module.exports = router;