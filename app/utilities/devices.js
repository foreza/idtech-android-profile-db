const devicesModel =  require('../models/devices');

const devicesUtils = {};

devicesUtils.createDevice = newDevice => {
    return new Promise((resolve, reject) => {
        devicesModel.create(newDevice, (err, createdDevice) => {
            if (err || !createdDevice)
                reject(err);

            resolve(createdDevice);
        });
    });
}

devicesUtils.getDeviceByID = deviceID => {
    return new Promise((resolve, reject) => {
        devicesModel.findById(deviceID, (err, device) => {
            if (err || !device)
                reject(err);

            resolve(device);
        });
    });
};

devicesUtils.getDeviceByIDAndPopulate = deviceID => {
    return new Promise((resolve, reject) => {
        devicesModel.findById(deviceID)
            .populate('profiles')
            .exec((err, device) => {
                if (err || !device)
                    reject(err);

                resolve(device);
            });
    });
}

devicesUtils.getDeviceByManufactureAndModel = (manufacture, model) => {
    return new Promise((resolve, reject) => {
        devicesModel.find({ manufacture, model }, (err, device) => {
            if (err || !device)
                reject(err);

            resolve(device[0]);
        });
    });
};

module.exports = devicesUtils;
