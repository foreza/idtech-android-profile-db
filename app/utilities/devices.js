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

module.exports = devicesUtils;
