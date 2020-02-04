var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const mongoose = require('mongoose');
var path = require('path');
var NFC_UserCollection = require('./models/NFC_UserSchema');

// const connect = mongoose.connect('mongodb+srv://admin:tNYyDUiGUtL5ZFF38ctG@kgdb-guwq3.mongodb.net/eventExperience?retryWrites=true&w=majority',
//     {
//         useNewUrlParser: true,
//         // useUnifiedTopology: true,
//     })
//     .then(
//         ()=> {
//             console.log("Successfully connected to the database.");
//         },
//         err => {
//             console.log("ERROR connecting to the database.");
//             throw err;
//         }
//     );

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:tNYyDUiGUtL5ZFF38ctG@kgdb-guwq3.mongodb.net/eventExperience?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  // client.close();
});

// connect.once('open', function() {
//   console.log("MongoDB database connection established successfully");
// })

app.get('/', (req, res) => {
  NFC_UserCollection.find({}, (errors, results) => {
      if (errors) res.send(errors);
      else {
        console.log("Database Results")
        console.log(results);
        res.sendFile(path.join(__dirname, './views/index.html'));
      }
  })
});

app.post('/', (req, res) => {
    console.log(req.body);
    // console.log(`CREATE NEW RSVP: ${req.body.nfc_scan_input}`);
  
    // NFC_UserCollection.create({username:req.body.nfc_scan_input}, (errors, results) =>{
    //   errors?res.send(errors) : res.send(results);
    // })

    // NFC_UserCollection.create(req.body, (errors, results) => {
    //     errors ? res.send(errors) : res.send(results);
    // })
});

io.on('connection', function(socket){
  console.log('a user connected');

  // io.emit('add_nfc_user',[{"username":"username1", "picture":"picture1"}, {"username":"username2", "picture":"picture2"}, {"username":"username3", "picture":"picture3"}]);

  NFC_UserCollection.find({}, 
    (error, results)=>
      {
        console.log("All user results");
        console.log(results);
        error?console.log(error):io.emit('add_nfc_user',[{"username":"username1", "picture":"picture1"}, {"username":"username2", "picture":"picture2"}, {"username":"username3", "picture":"picture3"}]);
      }
  );
  
  var empty_NFC_User = new NFC_UserCollection();

  // All info on nfc_user
  socket.on('add_nfc_user', function(msg){
    console.log('message: ' + msg);

    // Send to each client on network
    NFC_UserCollection.findOne({username: msg},
      (errors, results) => {
        if (errors){
          console.log("Error finding user");
        }

        else {
          if(results){
            console.log("User already exists");
          }
          else{
            console.log("Need to add the user");
            NFC_UserCollection.create( {username: msg}, 
              (error, results)=>
                {
                  error?console.log(error):console.log(results);
            });
          }
        }
    })
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});