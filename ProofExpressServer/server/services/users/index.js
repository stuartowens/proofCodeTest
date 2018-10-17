const User = require('../../models/user');
const Campaign = require('../../models/campaign');

//Mock user data that was used initially before the mongoimport

const users = [{ "User ID" : 1, "IP" : "43.217.98.114", "Geo" : "Austin", "Industry" : "Software", "Company Size" : "0-50", "" : "" },
{ "User ID" : 2, "IP" : "101.247.100.229", "Geo" : "San Francisco", "Industry" : "Software", "Company Size" : "100-200", "" : "" },
{ "User ID" : 3, "IP" : "201.112.124.140", "Geo" : "Denver", "Industry" : "Sports", "Company Size" : "0-50", "" : "" },
{ "User ID" : 4, "IP" : "253.231.118.198", "Geo" : "Dallas", "Industry" : "Sports", "Company Size" : "100-200", "" : "" },
{ "User ID" : 5, "IP" : "160.170.200.182", "Geo" : "New York", "Industry" : "Marketing", "Company Size" : "100-200", "" : "" },
{ "User ID" : 6, "IP" : "129.88.147.200", "Geo" : "San Francisco", "Industry" : "Retail", "Company Size" : "0-50", "" : "" },
{ "User ID" : 7, "IP" : "154.85.159.174", "Geo" : "Austin", "Industry" : "Oil and Gas", "Company Size" : "1000+", "" : "" },
{ "User ID" : 8, "IP" : "179.180.127.155", "Geo" : "Dallas", "Industry" : "Software", "Company Size" : "100-200", "" : "" },
{ "User ID" : 9, "IP" : "201.111.240.66", "Geo" : "San Antonio", "Industry" : "Tourism", "Company Size" : "0-50", "" : "" },
{ "User ID" : 10, "IP" : "79.210.84.134", "Geo" : "New York", "Industry" : "Sports", "Company Size" : "201-499", "" : "" }];

//This is the campaign seed data

const campaigns = [	{ "Campaign ID": "Campaign 1", "Identifier" : { "Geo" : "Austin"}, "ImagePath": "/images/Austin.jpg", Priority : 1 },
{ "Campaign ID": "Campaign 2", "Identifier" : { "Geo" : "San Francisco"}, "ImagePath": "/images/SanFrancisco.jpg", Priority : 2 },
{ "Campaign ID": "Campaign 3", "Identifier" : { "Industry" : "Software"}, "ImagePath": "/images/Software.png", Priority : 3 },
{ "Campaign ID": "Campaign 4", "Identifier" : { "Industry" : "Sports"}, "ImagePath": "/images/Sports.jpg", Priority : 4 },
{ "Campaign ID": "Campaign 5", "Identifier" : { "Company Size" : "0-50"}, "ImagePath": "/images/proof.png", Priority : 5 },
{ "Campaign ID": "Campaign 6", "Identifier" : { "Company Size" : "100-200"}, "ImagePath": "/images/smb.jpg", Priority : 6 },
{ "Campaign ID": "Campaign 7", "Identifier" : { "N/A" : "N/A"}, "ImagePath": "/images/shrug.png", Priority : 7 }]

// Ok so the bulk of the logic for the problem sort of sits here, first I find all the campaigns in current status (in case priority changes).

function getUsers(req, res) {
    Campaign.find().then((campaigns, err)=>{
        campaigns.forEach((campaignEle, i, arr)=> {
            User.find(campaignEle.Identifier).then((users, err)=>{
//For the subsect of Users identified with the query I update the current Campaign so that the most High Priority Campaign is represented
                users.forEach((userEle)=>{
                    if(!userEle["Campaign IDs"] || userEle["Campaign IDs"].Priority < campaignEle.Priority){
                        User.update({"_id" : userEle._id}, { "Campaign IDs" : campaignEle }, function (err, raw) {
                            if (err) return console.log(err);
                            console.log('The raw response from Mongo was ', raw);
                        })
                    }
                })
//  Loop through the campaigns and find the subsect of Users that matches the identifier for each one and place them in the correct group
                Campaign.update({"_id" : campaignEle._id}, {"Users": users}, function (err, raw) {
                    if (err) return console.log(err);
                    console.log('The raw response from Mongo was ', raw);
                })
            })
        })
    });
    res.send("Users all updated");
}

//Seed Mock User Data with CSV

function createUsers(req, res) {
    User.insertMany(users, (err)=> {
        if (err) {console.log(err);}
    })
    res.send("Done creating users");
}

//Seed Campaign Data

function createCampaigns(req, res) {
    Campaign.insertMany(campaigns, (err)=> {
        if (err) {console.log(err);}
    })
    res.send("Done creating campaigns");
}

//Todo: rePrioritize two campaigns at a time and swap the Priorities

function prioritizeCampaigns(req, res) {
    res.send("Done prioritizing campaigns")
}

//This is how I search for the User with this specific Ip Address

function getUserWithId(req, res) {
    User.find({ "IP": req.params.id }).then((users)=>{
        res.json(users);
    })
}

module.exports = {
    getUsers: getUsers,
    getUserWithId: getUserWithId,
    createUsers: createUsers,
    createCampaigns: createCampaigns
};
