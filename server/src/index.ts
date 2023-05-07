
import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import expressSession from 'express-session';
import { User } from './model/User';
import { Product } from './model/Product';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 3000;
//const dbUrl = 'mongodb://localhost:5000/my_db'
const {
    ATLAS_URI,
    MONGO_USER,
    MONGO_PASSWORD,
  } = process.env;

 const dbUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@prf-cluster.nixnksw.mongodb.net/`;

mongoose.connect( dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(async _ => {
    console.log('Successfully connected to MongoDB');

}).catch(error => {
    console.log(error);
});


const bootstrapApp = async () => {
    const defaultUser = new User({ 
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123',
        name: 'John Doe',
        address: '123 Main St'
    });

    try {
        const existingUser = await User.findOne({ username: defaultUser.username });
        if (!existingUser) {
            await defaultUser.save();
            console.log(`Default user (${defaultUser.username}) created`);
        } else {
            console.log(`Default user (${defaultUser.username}) already exists`);
        }
    } catch (error) {
        console.log('Error during app bootstrap:', error);
    }
};

bootstrapApp();




// User modell használata
const user = new User({
    username: 'johndoe2',
    email: 'johndoe2@example.com',
    password: 'password123',
    name: 'John Doe',
    address: '123 Main St'
  });
  
  user.save().then((savedUser: any) => {
    console.log(savedUser);
  }).catch((error: any) => {
    console.error(error);
  });
  
  // Product modell használata
  const product = new Product({
    name: 'Laptop',
    price: 999,
    description: 'A powerful laptop for work and play'
  });
  
  product.save().then((savedProduct: any) => {
    console.log(savedProduct);
  }).catch((error: any) => {
    console.error(error);
  });


  product.save().then((savedProduct: any) => {
    console.log(savedProduct);
  }).catch((error: any) => {
    console.error(error);
  });






// const whiteList = ['http://localhost:4200'];
const whiteList = ['*'];
const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (whiteList.indexOf(origin) !== -1 || whiteList.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

passport.serializeUser((user: Express.User, done) => {
    console.log('user is serialized');
    done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
    console.log('user is deserialized');
    done(null, user);
});

passport.use('local', new passportLocal.Strategy((username, password, done) => {
    User.findOne({ username: username }, (err: any, user: any) => {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        user.comparePassword(password, (err: any, isMatch: boolean) => {
            if (err) { return done(err); }
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    });
}));

app.use(expressSession({ secret: 'testsecret'}));       //, resave: false, saveUninitialized: false 
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/app', require('./routes/routes')(passport, express.Router()));

app.listen(port, () => {
    console.log('App is listening on port 3000...');
});

