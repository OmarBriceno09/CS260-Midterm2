const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

//export PORT=4201
//-------------------------edited code
// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  title: String,
  price: String,
  path: String,
  ordered: Number,
  purchased: Boolean,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
/*app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});*/

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/products', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    price: req.body.price,
    path: req.body.path,
    ordered: req.body.ordered,
    purchased: req.body.purchased,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/products', async (req, res) => {
  try {
    let items = await Item.find();
    //console.log(items.length);-- it does get items list
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//deleting tiem in museum...
//app.post('/api/photos', upload.single('photo'), async (req, res) => {
app.delete('/api/products/:the_id', async (req, res, next) => {
    console.log("deleting");
    //console.log(req.params.the_id);
    var c_id = req.params.the_id;
    //let item = await Item.findById(c_id);
    //console.log(item._id);
    Item.findByIdAndRemove(c_id, (err, tasks) => {
            if (err) return res.status(500).send(err);
            const response = {
                message: "Todo successfully deleted",
                id: req.params.id
            };
            return res.status(200).send(response);
        });
});

//just in case
app.delete('/api/products/', async (req, res, next) => {
    console.log("deleting all");
    //console.log(req.params.the_id);
    Item.remove({}, function(err) {
            if (err) {
                console.log(err)
            } else {
                res.end('success');
            }
        }
    );
});

app.put('/api/products/:the_id', async (req, res, next) => {
    let item = await Item.findById(req.params.the_id);
    item.title = req.body.title;
    item.price = req.body.price;
    item.purchesed = req.body.purchesed;
    await item.save();
});

app.put('/api/products/', async (req, res, next) => {
    console.log("im in");
    let item = await Item.findById(req.params.the_id);
    item.title = req.body.title;
    item.price = req.body.price;
    item.path = req.body.path;
    item.ordered = item.ordered+1;
    item.purchased = req.body.purchased;
    await item.save();
});
//-------------------edited code

app.listen(4201, () => console.log('Server listening on port 4201!'));