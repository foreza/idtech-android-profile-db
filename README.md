
## DISCLAIMER:

**This service is currently NOT maintained by IDTECH Products.**


This open source project is supported by former IDTECH employees and integrators who have worked with IDTECH.

This code is provided to you, the developer, free of charge in the event you'd like to run this locally on your own production instance rather than depend on an IDTECH instance. 

For official support and questions, please contact support@idtechproducts.com with your questions.

Please feel free to open up a pull request / issue. We will respond typically within 2-3 days. 


#### idtech-android-profile-db

This is a web service for expediting the process of retrieving android phone profiles.
This utilizes Node / Express / MongoDB to provide a RESTful way of retrieving, storing, updating, and adding new phone profiles.
All known android phone profiles are stored on the database and can be retrieved in constant time.

IDTECH integrators are welcome to use this service in conjunction with our latest Android SDK as well.


The current live running (test) instance is at:
http://206.189.79.132:8080/

API Documentation is available at:
http://206.189.79.132:8080/apidoc/index.html 

Latest IDTECH Android SDKs are always available at:
https://atlassian.idtechproducts.com/confluence/display/KB/Android+Development+-+Home

Get in touch with IDTECH support for the latest updates for software and firmware at support@idtechproducts.com

Again - **This project is NOT officially maintained by IDTECH Products.**



### Requirements

MongoDB > v3.6.3
Node.js > v8.11.1

### Installation 


Clone the application from https://github.com/foreza/idtech-android-profile-db

# INSTALL MONGODB
We want to install the latest MongoDB. The latest instructions on provided on MongoDB's website.
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

# INSTALL NODE
We want to install a copy of Node.js.
https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions

  ``` curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash - ``` 
   ```  sudo apt-get install -y nodejs ``` 

# INSTALL NPM
We want to install NPM if it hasn't been installed already.
 ``` apt install npm ```


# INSTALL PACKAGES
We want to then use NPM to install the packages. Ensure you are in the project root directory where the package.json is located.
 ``` npm install ```

# CREATE DATA/DB 
We want to create the /data/db directory in the root directory of your instance. Otherwise, MongoDB will not start up.

 ``` mkdir -p /data/db ```

# Start Mongo 
Start the service. We recommend you open on a seperate screen for testing purposes, and then start as a service when your instance boots up. 

``` sudo mongod ```

# Start the server 
Start the server, and it will run by default on port 8080. Can configure in server.js

``` node server.js ```

