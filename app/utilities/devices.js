const devicesModel =  require('../models/devices');

const devicesUtils = {};

// This utility creates a device based off of specified defaults.
devicesUtils.createDevice = newDevice => {
    return new Promise((resolve, reject) => {
        devicesModel.create(newDevice, (err, createdDevice) => {
            if (err) reject(err);

            resolve(createdDevice);
        });
    });
}

// This utility returns a device given a device ID
devicesUtils.getDeviceByID = deviceID => {
    return new Promise((resolve, reject) => {
        devicesModel.findById(deviceID, (err, device) => {
            if (err) reject(err);

            resolve(device);
        });
    });
};

// This utility returns a device given the ID, and then populates with the associated profiles
devicesUtils.getDeviceByIDAndPopulate = deviceID => {
    return new Promise((resolve, reject) => {
        devicesModel.findById(deviceID)
            .populate('profiles')
            .exec((err, device) => {
                if (err) reject(err);

                resolve(device);
            });
    });
}

// This utility returns a device given a manufacture and model
devicesUtils.getDeviceByManufactureAndModel = (manufacture, model) => {
    return new Promise((resolve, reject) => {
        devicesModel.find({ manufacture, model }, (err, device) => {
            if (err) reject(err);

            resolve(device[0]);
        });
    });
};

// This utility returns a device given a manufacture and model, and then populates with the associated profiles
devicesUtils.getDeviceByManufactureAndModelAndPopulate = (manufacture, model) => {
    return new Promise((resolve, reject) => {
        devicesModel.find({ manufacture, model })
            .populate('profiles')
            .exec((err, device) => {
                if (err) reject(err);

                resolve(device[0]);
            });
    });
};

// This utility adds a profile to a specified device given a device ID and profile ID
devicesUtils.addProfileForDevice = (deviceID, profileID) => {
    return new Promise((resolve, reject) => {
        devicesModel.findByIdAndUpdate(deviceID, { $push: { 'profiles': profileID } }, (err, updatedDevice) => {
            if (err) reject(err);

            resolve(updatedDevice);
        });
    });
};

// This utility lists all known devices in the DB
devicesUtils.listAllDevices = () => {
  return new Promise((resolve, reject) => {
    devicesModel.find({}, function(err, deviceList) {
      if (err){
        reject(err);
      }
      resolve(deviceList);

    });

});
};

module.exports = devicesUtils;
