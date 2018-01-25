'use strict'

const AWS = require('aws-sdk');
var MongoClient = require('mongodb').MongoClient;

let atlas_connection_uri;
let cachedDb = null;


exports.handler = (event, context, callback) => {
      var uri = process.env['MONGODB_ATLAS_CLUSTER_URI'];
      console.log('remaining time =', context.getRemainingTimeInMillis());
      console.log('functionName =', context.functionName);
      console.log('AWSrequestID =', context.awsRequestId);
      console.log('logGroupName =', context.logGroupName);
      console.log('logStreamName =', context.logStreamName);
      console.log('clientContext =', context.clientContext);
      if (atlas_connection_uri != null) {
        atlas_connection_uri = uri;
          processEvent(event, context, callback);
      }
      else {
          const kms = new AWS.KMS();
          kms.decrypt({ CiphertextBlob: new Buffer(uri, 'base64') }, (err, data) => {
              if (err) {
                  console.log('Decrypt error:', err);
                  return callback(err);
              }
              atlas_connection_uri = data.Plaintext.toString('ascii');
              processEvent(event, context, callback);
          });

      }
}

function connectToDatabase(uri) {

    //Performance optimization Step 3: test that database connection exists and is valid
    //before re-using it
    if (cachedDb && cachedDb.serverConfig.isConnected()) {
        console.log('=> using cached database instance');
        return Promise.resolve(cachedDb);
    }

    return MongoClient.connect(uri)
        .then(db => { cachedDb = db; return cachedDb; });
}

function processEvent(event, context, callback) {
    context.callbackWaitsForEmptyEventLoop = false
    connectToDatabase(atlas_connection_uri)
        .then(db => queryDatabase(db, event))
        .then(result => {
            console.log('query results: ', result);
            callback(null, result);
        })
        .catch(err => {
            console.log('=> an error occurred: ', err);
            callback(err);
        });
}


function queryDatabase(db, event) {
    var jsonContents = JSON.parse(JSON.stringify(event));

    //handling API Gateway input where the event is embedded into the 'body' element
    if (event.body !== null && event.body !== undefined) {
        console.log('retrieving payload from event.body');
        jsonContents = JSON.parse(event.body);
    }

    console.log('query parameters: ', jsonContents);
    let startsWith = jsonContents.startsWith;
    let prefix = jsonContents.prefix;
    let category = jsonContents.category;
    let query;
    if(prefix.length && category.length) {
      query = { "name": new RegExp(startsWith) , "prefix": prefix, "category": category};
    } else if(prefix.length) {
      query = { "name": new RegExp(startsWith) , "prefix": prefix};
    } else if (category.length) {
      query = { "name": new RegExp(startsWith), "category": category};
    } else {
      query = { "name": new RegExp(startsWith) }
    }
    return db.collection('Numbers').aggregate([{ $match: query },
    { $project: { "_id": 0, "name": 1, "number": 1, "vanity_tier": 1, "prefix": 1, "category": 1, "popular_usage": 1, "unavailable_markets": 1, "url": 1 } }
    ]).toArray()
        .then(docs => {
          console.log("Kudos! You just queried an entry in the numbers collection with name, category, and prefix: " + docs);
          return docs;

        })
        .catch(err => { return err; });
}



var testAPI = {   "stateMachineArn": "arn:aws:states:us-east-1:077838313479:stateMachine:WhatsThisRestrauntAgain",
"input":"{\"startsWith\": \"V\", \"cuisine\": \"Italian\",\"zipcode\": \"10075\",\"phoneTo\": \"+15555555555\",\"firstnameTo\": \"Stu\",\"emailTo\": \"homerowens@yahoo.com\",\"subject\": \"List of restaurants for {{firstnameTo}}\"}"
}
// exports.handler = (event, context, callback) => {
//     var uri = process.env['MONGODB_ATLAS_CLUSTER_URI'];
//
//     if (atlas_connection_uri != null) {
//         processEvent(event, context, callback);
//     }
//     else {
//         const kms = new AWS.KMS();
//         kms.decrypt({ CiphertextBlob: new Buffer(uri, 'base64') }, (err, data) => {
//             if (err) {
//                 console.log('Decrypt error:', err);
//                 return callback(err);
//             }
//             atlas_connection_uri = data.Plaintext.toString('ascii');
//             processEvent(event, context, callback);
//         });
//
//     }
// };
//
//
// function processEvent(event, context, callback) {
//     console.log('Calling MongoDB Atlas from AWS Lambda with event: ' + JSON.stringify(event));
//     var jsonContents = JSON.parse(JSON.stringify(event));
//
//     //date conversion for grades array
//     // if(jsonContents.grades != null) {
//     //     for(var i = 0, len=jsonContents.grades.length; i < len; i++) {
//     //         //use the following line if you want to preserve the original dates
//     //         jsonContents.grades[i].date = new Date(jsonContents.grades[i].date);
//     //
//     //         //the following line assigns the current date so we can more easily differentiate between similar records
//     //         jsonContents.grades[i].date = new Date();
//     //     }
//     // }
//
//     //the following line is critical for performance reasons to allow re-use of database connections across calls to this Lambda function and avoid closing the database connection. The first call to this lambda function takes about 5 seconds to complete, while subsequent, close calls will only take a few hundred milliseconds.
//     context.callbackWaitsForEmptyEventLoop = false;
//
//     try {
//         if (cachedDb == null) {
//             console.log(atlas_connection_uri, '=> connecting to database');
//             MongoClient.connect(atlas_connection_uri, function (err, db) {
//                 // console.log(err, "err!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//                 // console.log(db, 'db~~~~~~~~~~')
//                 cachedDb = db;
//                 return createDoc(db, jsonContents, callback);
//             });
//         }
//         else {
//             createDoc(cachedDb, jsonContents, callback);
//         }
//     }
//     catch (err) {
//         console.error('an error occurred', err);
//     }
// }
//
// function createDoc (db, json, callback) {
//   db.collection('Numbers').find({ number: json.number }, function(err, result) {
//       if(err!=null) {
//           console.error("an error occurred in createDoc", err);
//           callback(null, JSON.stringify(err));
//       }
//       else {
//         console.log("Kudos! You just created an entry into the numbers collection with id: " + result.insertedId);
//         callback(null, "SUCCESS");
//       }
//       //we don't need to close the connection thanks to context.callbackWaitsForEmptyEventLoop = false (above)
//       //this will let our function re-use the connection on the next called (if it can re-use the same Lambda container)
//       // db.close();
//   });
// };
