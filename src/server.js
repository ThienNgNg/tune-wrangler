const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();
const axios = require("axios");
const request = require("request")

const port = 3000;
const hostname = "localhost";

// number of rounds the bcrypt algorithm will use to generate the salt
// the more rounds, the longer it takes
// so the salt will be more secure
// https://github.com/kelektiv/node.bcrypt.js#a-note-on-rounds
const saltRounds = 10;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

let token;
console.log(token)
console.log("Getting Spotify Token...\n")

function getToken (){
  //the client_id and secret will be put in the file not here
  var client_id = '9b2a4621bd7c41daa046f4000ec14367'; // Your client id
  var client_secret = '5b2177289d6b4fd1bd5e34d2106eac41'; // Your secret

    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };


  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      token = body.access_token;
      console.log(`\nToken: ${token}\n`);
      var options = {
        url: 'https://api.spotify.com/v1/users/joegal513',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      console.log(token);
      request.get(options, function(error, response, body) {
        //console.log(body);
      });
    }
  });
  axios({
      url : 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      params:{
          grant_type: 'client_credentials'
      },
      json: true
    })
    .then (function(response){
        token = response.data.access_token;
        console.log(token);
        //get genres
        getGenres();

    })
    .catch(function(error){
        console.log(error);
    })
  }

getToken()
console.log("Received Token")




app.use(express.static("public"));
app.use(express.json());





// app.post("/login", function (req, res) {
//     let username = req.body.username;
//     let password= req.body.password;
//     let email = req.body.email;
//     let firstName = req.body.firstName;
//     let lastName = req.body.lastName;
//
//     // TODO check body has username and plaintextPassword keys
//     if(!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("plaintextPassword")){
//         res.status(401).json();
//     }
//     else if(typeof(username) !== "string" && typeof(plaintextPassword) !== "string"){
//
//         res.status(401).json();
//     }
//     // TODO check password length >= 5 and <= 36
//     else if(plaintextPassword.length < 5 || plaintextPassword.length >36){
//
//         res.status(401).json();
//     }
//     // TODO check username length >= 1 and <= 20
//     else if(username.length < 1 || username.length >20){
//
//         res.status(401).json();
//     }
//     else{
//     // TODO check if username already exists
//     pool.query("SELECT username FROM users where username = $1",[username])
//         .then (function (response){
//             if(response.rows.length > 0){
//                 res.status(401).json();
//             }
//             else{
//               bcrypt
//                   .hash(plaintextPassword, saltRounds)
//                   .then(function (hashedPassword) {
//                       pool.query(
//                           "INSERT INTO users (username, hashed_password, ) VALUES ($1, $2)",
//                           [username, hashedPassword]
//                       )
//                           .then(function (response) {
//                               // account successfully created
//                               res.status(200).send();
//                               //redirect
//                           })
//                           .catch(function (error) {
//                               console.log(error);
//                               res.status(500).send(); // server error
//                           });
//                   })
//                   .catch(function (error) {
//                       console.log(error);
//                       res.status(500).send(); // server error
//                   });
//             }
//         }).catch (function (error){
//             console.log(error);
//         })
//       }
//
// });
let genres;
function getGenres (){
    console.log("Getting Genre....\n");
    //while loop just use for testing
      axios({
          url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
          },
          json: true
      })
      .then(function(response){
        //console.log(response)
        genres = response.data.genres
        console.log(genres)
        console.log(typeof(genres))

      }).catch(function(error){
        console.log(error)
      })
}


function getArtists(){
  console.log("Getting Artists");
  axios({
    url : 'https://api.spotify.com/v1/',
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },
    json: true
  })
  .then (function(response){
      console.log(response);

  })
  .catch(function(error){
      console.log(error);
  })

}
let listOfArtists = new Object();
function getTop50 (){
  let playlist_id = '37i9dQZEVXbMDoHDwVN2tF'
  axios({
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      json: true
  }).then(function(response){
      if(response.status === 200){
          return response.data
      }

  }).then(function(data){
      items = data.items
      console.log(items)
      console.log("Enter the loop")
      for (let i = 0; i< 50; i++){
          console.log(items[i])
          name = items[i].track.artists[0].name
          id = items[i].track.artists[0].id
          listOfArtists[`${name}`] = id
      }
      console.log(listOfArtists)
  }).catch(function(error){
      console.log(error)
  })
}

app.get("/genre",function(req,res){
  getGenres();
  message = {};
  message.genre = genres;
  console.log(message)
  res.status(200).json(message)
})

app.post("/signup", function(req, res){

  // parsing user object and store in database.
  let username = req.body.username;
  let password= req.body.password;
  let email = req.body.email;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let dob = req.body.dob
  //storing user data
  bcrypt.hash(password, saltRounds)
        .then(function(hashedPassword){
            pool.query(
              "INSERT INTO users (username, hashed_password, first, last, DOB, email, address) VALUES ($1, $2, $3, $4, $5, $6)",
              [username, hashedPassword, firstName, lastName, dob, email])
                .then(function(response){
                  //storing user genres/artists references
                    let references = req.body.references;
                    let genres = []
                    let artists = []
                    if(references === "none"){
                        //send a get request to Spotify API to get the top 50 artists and their genres
                        getTop50();
                    }
                    else{
                        genre = references.genres
                        artists = references.artist
                    }
                    let userId = ""
                    pool.query(
                        "SELECT userID FROM users WHERE username = $1",[username])
                        .then(function(response){
                            userId = response.userId
                      })
                    pool.query(
                        "INSERT INTO references (usersId, genres, artists) VALUE ($1, $2, $3)",[userId, genres.toString(), artists.toString()])
                        .then(function(response){
                            res.status(200).send();
                        })
                })
                .catch(function (error){
                    res.status(500).send();
                })
        })
        .catch(function(error){
            console.log(error);
            res.status(500).send();
        })

})

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
