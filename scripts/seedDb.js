const mongoose = require('mongoose');
const db = require('../models');

const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const password = 'password';
hash.update( password );
const codedPassword = hash.digest('hex');

var today = new Date();
today.setHours(8, 16, 45);

var created = new Date();
created.setDate( today.getDate() - 7 );

var yesterday = new Date();
yesterday.setDate( today.getDate() - 1 );
yesterday.setHours(8, 22, 15);

var beforeYesterday = new Date();
beforeYesterday.setDate( yesterday.getDate() - 1 );
beforeYesterday.setHours(6, 56, 22);

var isoDate = created.toISOString();
var isoDate1 = today.toISOString();
var isoDate2 = yesterday.toISOString();
var isoDate3 = beforeYesterday.toISOString();


//user collection seeds
const userSeed = [
    {
        firstName: "Joed",
        lastName: "Machado",
        email: "joedmg58@gmail.com",
        password: codedPassword,
        role: "user",
        date: isoDate,
        tickets:[
            {
                date: isoDate1,
                location: "St. Regis 2500",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate2,
                location: "Surf Club 803",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate3,
                location: "La Petite Muse Hotel",
                amount: 12.00,
                aproved: false
            }
        ]
    },
    {
        firstName: "Edmundo",
        lastName: "Dantes",
        email: "ed1970@mail.com",
        password: codedPassword,
        role: "user",
        date: isoDate,
        tickets:[
            {
                date: isoDate1,
                location: "St. Regis 2500",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate2,
                location: "Surf Club 803",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate3,
                location: "La Petite Muse Hotel",
                amount: 12.00,
                aproved: false
            }
        ]
    },
    {
        firstName: "Jerry",
        lastName: "Lewis",
        email: "admin@mail.com",
        password: codedPassword,
        role: "manager",
        date: isoDate,
        tickets:[
            {
                date: isoDate1,
                location: "St. Regis 2500",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate2,
                location: "Surf Club 803",
                amount: 16.00,
                aproved: false
            },
            {
                date: isoDate3,
                location: "La Petite Muse Hotel",
                amount: 12.00,
                aproved: false
            }
        ]
    }
];



//Locations collection seeds

locationSeed = [
    {
        name: 'St. Regis 2500',
        coordinates: {lat: 0, long: 0}
    },
    {
        name: 'Surf Club 803',
        coordinates: {lat: 0, long: 0}
    },
    {
        name: 'La Petite Muse Hotel',
        coordinates: {lat: 0, long: 0}
    },
]


function populateUser() {
    console.log('Inserting users...');
    db.User
        .deleteMany({})
        .then(() => db.User.collection.insertMany(userSeed))
        .then(data => {
            console.log( "=> " + data.result.n + " user records inserted!");
            populateLocation();
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });

}

function populateLocation() {
    console.log('Inserting locations...');
    db.Contractor
        .deleteMany({})
        .then( () => db.Location.collection.insertMany(locationSeed) )
        .then( data => {
            console.log( "=> " + data.result.n + " location records inserted!");
            process.exit(0);
        } )
        .catch( function(err) {
            console.error(err);
            process.exit(1);
        });
}



//------------------------------------------------------


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/parkingTickets", {useNewUrlParser: true} )
    .then( () => { 
        populateUser();
    },
    err => { 
        console.log('Error connection to MongoDB \n' + error);
    }
);