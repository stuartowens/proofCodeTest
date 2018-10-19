Start Server:
  First things you need to do to start this app: "npm install", and "npm start" in one terminal to get the server running.

Start Mongodb:
  Then get an instance of MongoDb running in a second terminal, and create a database called "proof". It should be running at mongodb://127.0.0.1:27017/proof but if it's not change the parameter in the config folder.

Seed the Database:
  So I've included the CSV file in the project, with a third terminal run the following commands.

  Seed Users with a Post to the server "mongoimport --host=127.0.0.1 -d proof -c users  --type csv --file ./ProofHW/Proof_homework.csv  --headerline"  or Alternatively use Postman or Soap UI to make Post and Get requests

  Seed Campaigns with a Post "curl --data http://localhost:3000/api/v1/users/createCampaigns" or Alternatively use Postman or Soap UI to make Post and Get requests

  Segment Users into groups using this GET "curl -i -H 'Accept: application/json' -H 'Content-Type: application/json' http://localhost:3000/api/v1/users/" or Alternatively use Postman or Soap UI to make Post and Get requests

  There are other options like Postman or SoapUI. Whatever you are more comfortable with will be fine to seed the database.

Navigate to the Site:

    http://localhost:3000/home navigate to the frontend to enter an IP address as your member ID then login to see the Picture change based on what campaign you are segmented into currently.

    Press Logout to check another IP to see if they are all working

Testing:
    Run the command "npm test" to run all tests and if the first test isn't passing maybe try running one more time. Sometimes the browser isn't loading the image quickly enough before the test can check for the src attribute on the first login so definitely try multiple times if it doesn't work the first time.
