const Redis = require("ioredis");
var redis = new Redis();
// Return true if merchant serves this pincode
const checkEntries = async (merchantName, Pincode) => {
    //Better to check merchant set, smaller is size probably?
    try {
        return await redis.sismember(merchantName, Pincode);
    } catch (error) {
        console.log(`Couldn't check if merchant serves location, error: ${error}`)
    }
}
const doesServe = async (req, res) => {
    const status = await checkEntries(req.body.merchantName, req.body.pinCode);
    res.json({ status: status });
}


//Return all merchants servicing a pincode
const getMerchants = async (req, res) => {
    const pinCode = req.body.pincode;
    const cursor = req.body.cursor;
    let check = redis.exists(pinCode);
    if (check == false) {
        //Bad Request
        res.status('400');
        return
    }
    redis.sscan(pinCode, cursor, "COUNT", 20).
        then((result) => {
            result = {
                cursor: result[0],
                data: result[1],
            }
            res.status(200).json(result);
        }).catch((error) => {
            console.log(error)
            res.status(500)
        })
}

//Return all pincodes serviced by a merchant
const getPincodes = async (req, res) => {
    const merchant = req.body.merchantName;
    const cursor = req.body.cursor;
    let check = redis.exists(merchant);
    if (check == false) {
        //Bad Request
        res.status('400');
        return
    }
    redis.sscan(merchant, cursor, "COUNT", 20).
        then((result) => {
            result = {
                cursor: result[0],
                data: result[1],
            }
            res.status(200).json(result);
        }).catch((error) => {
            console.log(error)
            res.status(500)
        })
}

//Delete this merchant
const deleteMerchant = async (req, res) => {
    const merchant = req.body.merchantName;
    try {
        let servicedPinCodes = await redis.smembers(merchant);
        for (let pincode of servicedPinCodes) {
            await redis.srem(pincode, merchant);
        }
        await redis.del(merchant)
        res.status(200).json({ Success: true });
    } catch (error) {
        res.status(400).json({ Success: false, Error: error });
    }
}

//Create a new merchant
const createMerchant = async (req, res) => {
    const merchant = req.body.merchantName;
    const pincodes = req.body.pincodes;
    try {
        await redis.sadd(merchant, pincodes)
        res.status(200).json({ Success: true });
    } catch (error) {
        res.status(400).json({ Success: false, Error: error });
    }
}

//Check if a merchant by this name exists
const checkMerchant = async (req, res) => {
    const merchant = req.body.merchantName;
    try {
        let result = await redis.exists(merchant);
        if (result) {
            res.status(200).json({ Exists: true });
        } else {
            res.status(200).json({ Exists: false });
        }
    } catch (error) {
        res.status(400).json({ Success: false, Error: error });
    }
}

//Update the pincodes serviced by a merchant
const updatePincodes = async (req, res) => {
    const merchant = req.body.merchantName;
    let toAdd = req.body.toAdd;
    //Verifying the pincodes actually exists, the request is not malicious
    let toAddChecked = [];
    for (let k = 0; k < toAdd.length; k++) {
        if (await redis.exists(toAdd[k])) toAddChecked.append(toAdd[k]);
    }
    const toRemove = req.body.toRemove;
    try {
        for (let pincode of toAddChecked) {
            await redis.sadd(pincode, merchant)
        }
        for (let pincode of toRemove) {
            await redis.srem(pincode, merchant)
        }
        await redis.srem(merchant, toRemove)
        await redis.sadd(merchant, toAddChecked)
        res.status(200).json({ Success: true })
    } catch (error) {
        console.log(error)
        res.status(400).json({ Success: false, Error: error })
    }
}

//Create a new pincode
const createPincode = async (req, res) => {
    const pincode = req.body.pincode;
    try {
        await redis.sadd(pincode, 0)
        res.status(200).json({ Success: true })
    } catch (error) {
        console.log(error)
        res.status(400).json({ Success: false, Error: error });
    }
}
module.exports = {
    doesServe, getMerchants, getPincodes, deleteMerchant, createMerchant, updatePincodes, createPincode, checkMerchant
}