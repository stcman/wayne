const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const RoomType = require('./RoomType');
const Session = require('./Session');
const path = require('path');

const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://user:password@ds341837.mlab.com:41837/wayne';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Get room data

router.get('/getData', (req, res) => {
  RoomType.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// Check if session exists
router.post('/checkSession', (req, res) => {
  const { sessionId } = req.body;
  Session.findOne({seshId: sessionId},(err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// Update inventory
router.post('/updateInv', (req, res) => {
  const { id, date1, date2 } = req.body;
  for(var i = date1; i < date2; i++){
    RoomType.update({_id: id, 'dates.date': i}, {$inc: {'dates.$.avail': -1}}, (err) => {
      if (err) return res.json({ success: false, error: err });
      if(i === date2-1){
        return res.json({ success: true });
      }
    });
  }
});

// Kill Session if exist
router.delete('/killSession', (req, res) => {
  const { sessionId } = req.body;
  Session.deleteOne({seshId: sessionId}, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// Delete all rooms
router.delete('/deleteRooms', (req, res) => {
  const { } = req.body;
  RoomType.deleteMany({}, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// Sessions Creation
router.post('/createSession', (req, res) => {
  let data = new Session();

  const { sessionId } = req.body;

  data.seshId = sessionId;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Reset Inventory
router.post('/resetInv', (req, res) => {

  class RoomTypes {
    constructor(name, roomType, description, price, image, dates){
        this.name = name;
        this.roomType = roomType;
        this.description = description;
        this.price = price;
        this.image = image;
        this.dates = dates;
    }
}

class Inventory {
    constructor(date, avail){
        this.date = date;
        this.avail = avail;
    }
}

const arrGrand = [];
const arrOther = [];

for(var i = 1; i < 32; i++){
    arrGrand.push(new Inventory(i, 2));
    arrOther.push(new Inventory(i, 5));
}

  const grandDesc = 'Exclusivity and comfort at all times. Enjoy the highest degree of relaxation with the services and facilities in this superior category room. Spacious and bright, overlooking the hotel pool, it provides a bedroom with Grand King Bed, ideal for precious moments of rest.'
  const execDesc = 'Enjoy unlimited experiences in this 80 m2 room with a lounge, butler and amazing windows offering beautiful views over the hotel pool, plus a bedroom with a queen bed and a full bathroom.';
  const kingDesc = 'The King Suite comes with a king bed with Dreamax mattress, a modern, fully equipped bathroom finished in top quality bronze-coloured ceramics and an independent entrance. It also has a home automation system which automatically regulates the temperature if there is a guest in the room';
  const queenDesc = 'Discover this modern 68 m2 Suite with superior facilities and service to make you feel fantastic. A comfortable bedroom with queen-size bed, a terrace and a bathroom with dressing area and a whirlpool bathtub. Ideal for relaxation.'
  const doubleDesc = 'A large window with beautiful views of the Wayne Park is part of the sophisticated charm of this 37 m2 room, along with a bathroom with a relaxing whirlpool bathtub separated from the bedroom by a sliding glass door.'
  const singleDes = 'An ideal resting place in the heart of the city. 27 m2 room with beautiful views of the Wayne Park. Superior services and facilities, plus a comfortable single beds to ensure the finest relaxation and comfort during your stay.';

  const roomObjs = [
      new RoomType(new RoomTypes('Grand Suite','GSUT', grandDesc, 5600, 'grand-suite.jpg', arrGrand)),
      new RoomType(new RoomTypes('Executive Suite','EXEC', execDesc, 4200, 'executive-suite.jpg', arrOther)),
      new RoomType(new RoomTypes('King Suite','KING', kingDesc, 3300, 'king-suite.jpg', arrOther)),
      new RoomType(new RoomTypes('Queen Suite','QUEN', queenDesc, 2700, 'queen-suite.jpg', arrOther)),
      new RoomType(new RoomTypes('Double Suite','DUBL', doubleDesc, 1700, 'double-suite.jpg', arrOther)),
      new RoomType(new RoomTypes('Single Suite','SNGL', singleDes, 1500, 'single-suite.jpg', arrOther))
  ];

  roomObjs.forEach((room, index) => {
        room.save((err) => {
          if (err) return res.json({ success: false, error: err });
          if(index === roomObjs.length - 1){
            return res.json({ success: true });
          }
        });
  });
});

// append /api for our http requests
app.use('/api', router);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
