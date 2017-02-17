const profilesModel =  require('../models/profiles');

const CryptoJS = require('crypto-js');

const profilesUtils = {};

profilesUtils.createProfile = newProfile => {
    return new Promise((resolve, reject) => {
        profilesModel.create(newProfile, (err, createdProfile) => {
            if (err || !createdProfile)
                reject(err);

            resolve(createdProfile);
        });
    });
}

profilesUtils.generateSHA256HexString = data => {
    return CryptoJS.SHA256(data.toString()).toString(CryptoJS.enc.Hex);
};

// This utility lists all profiles.
profilesUtils.listAllProfiles = () => {
  return new Promise((resolve, reject) => {
    profilesModel.find({}, (err, profileList) =>{
      if (err || !profileList){
        reject(err);
      }
      resolve(profileList);
    });
  });
};

module.exports = profilesUtils;
