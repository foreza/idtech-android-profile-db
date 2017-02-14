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
    return CryptoJS.SHA256(data.toString()).toString(CryptoJS.enc.Hex)
};

module.exports = profilesUtils;
