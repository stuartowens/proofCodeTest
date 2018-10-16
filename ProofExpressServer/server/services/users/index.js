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


function getUsers(req, res) {
    res.json(users);
}

function getUserWithId(req, res) {
    let id = req.params.id || 0,
        result = {};

     for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            result = users[i];
            break;
        }
     }

     res.json(result);
}

module.exports = {
    getUsers: getUsers,
    getUserWithId: getUserWithId
};
