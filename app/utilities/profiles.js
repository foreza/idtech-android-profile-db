const profilesModel =  require('../models/profiles');

const CryptoJS = require('crypto-js');

const profilesUtils = {};

// This utility creates a brand new profile based off of profile Model defaults.
profilesUtils.createProfile = newProfile => {
    return new Promise((resolve, reject) => {
        profilesModel.create(newProfile, (err, createdProfile) => {
            if (err) reject(err);

            resolve(createdProfile);
        });
    });
}

// This utility generates a SHA256 Hex based off of provided Profile params
profilesUtils.generateSHA256HexString = data => {
    return CryptoJS.SHA256(data.toString()).toString(CryptoJS.enc.Hex);
};

// This utility finds a profile given a unique mongo ID
profilesUtils.findProfileByUniqueID = (profileID) => {
  return new Promise((resolve, reject) => {
    profilesModel.find({ _id : profileID}, (err, profile) => {
      if (err){
        reject(err);
      }
      resolve(profile);
    });
  });
};


// This utility lists all profiles.
profilesUtils.listAllProfiles = () => {
  return new Promise((resolve, reject) => {
    profilesModel.find({}, (err, profileList) =>{
      if (err){
        reject(err);
      }
      resolve(profileList);
    });
  });
};

profilesUtils.incrementDeviceCounter = (profileID, fieldToIncrement) => {
    const incrementSpecifications = {};
    incrementSpecifications[fieldToIncrement] = 1;

    return new Promise((resolve, reject) => {
        profilesModel.findByIdAndUpdate(
            profileID,
            { $inc: incrementSpecifications },
            { new: true },
            (err, updatedProfile) => {
                if (err) reject(err);

                resolve(updatedProfile);
            }
        );
    });
};

module.exports = profilesUtils;
