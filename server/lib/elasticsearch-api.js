const request = require('request');
const localConfig = require('../config/local.json');
var elasticUrl = localConfig.elasticUrl;
var elasticUsername = localConfig.elasticUsername;
var elasticPassword = localConfig.elasticPassword;




function getToken() {
    const options = {
      method: 'POST',
      uri: elasticUrl+'/_security/oauth2/token',
      proxy: '',
      rejectUnauthorized: false,
      body: {
        "username": elasticUsername,
        "password": elasticPassword
      
      },
      json: true
    };
    return new Promise((resolve, reject) => {
      request(options, (err, response, body) => {
        if(err) reject(err);
        if(response.statusCode == 200){
          resolve(body.token);
        } else {
          reject("Error al obtener token: "+err);
        }
      });
    });
  }


  




