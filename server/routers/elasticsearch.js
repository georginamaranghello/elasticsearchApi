const express = require('express');
const elasticApi = require("../lib/elasticsearch-api.js");
const router = express.Router();
const elastic = require('elasticsearch');
const elasticUrl = 'http://172.22.141.126:10144';


module.exports = function (app) {

    const bodyParser = require('body-parser');
    const router = express.Router();
    router.use(bodyParser.urlencoded({
        extended: false
    }));
    router.use(bodyParser.json());


    const elasticClient = elastic.Client({
        host: 'http://172.22.141.126:10144',
    });



    router.get('/comp-7-s*/_doc/0', (req, res) => {
        let query = {
            index: 'comp-7-s*'
        }
        if (req.query.example) query.q = `*${req.query.example}*`;
        elasticClient.search(query)
            .then(resp => {
                return res.status(200).json({
                    example: resp
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    msg: 'Error',
                    err
                });
            });
    });


    router.post('/comp-7-s*/_doc/0', bodyParser, (req, res) => {
        elasticClient.index({
                index: 'comp-7-s*',
                body: req.body
            })
            .then(resp => {
                return res.status(200).json({
                    msg: 'sucsess'
                });
            })
            .catch(err => {
                return res.status(500).json({
                    msg: 'Error',
                    err
                });
            })
    });


    router.get('/comp-7-s*/_doc/0?_source=*.id', (req, res) => {
        let query = {
            index: 'comp-7-s*',
            id: req.params.id
        }
        elasticClient.get(query)
            .then(resp => {
                if (!resp) {
                    return res.status(404).json({
                        example: resp
                    });
                }
                return res.status(200).json({
                    example: resp
                });
            })
            .catch(err => {
                return res.status(500).json({
                    msg: 'Error not found',
                    err
                });
            });
    });




    router.put('/comp-7-s*/:id', bodyParser, (req, res) => {
        elasticClient.update({
                index: 'comp-7-s*',
                id: req.params.id,
                body: {
                    doc: req.body
                }
            })
            .then(resp => {
                return res.status(200).json({
                    msg: 'updated'
                });
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json({
                    msg: 'Error',
                    err
                });
            })
    });


    router.delete('/comp-7-s*/:id', (req, res) => {
        elasticClient.delete({
                index: 'comp-7-s*',
                id: req.params.id
            })
            .then(resp => {
                res.status(200).json({
                    'msg': 'deleted'
                });
            })
            .catch(err => {
                res.status(404).json({
                    'msg': 'Error'
                });
            });
    });

    app.use('', router);

}

module.exports = router;