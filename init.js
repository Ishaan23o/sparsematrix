const randomstring = require('randomstring');
const Redis = require("ioredis");
var redis = new Redis();
//Replace app.listen(.....) with these lines if datastore has not been initialised
class Init {
    pincodes = new Set();
    createRandomPincodes = async () => {
        //Generate 30k pincodes randomly
        for (let i = 0; this.pincodes.size < 30000; i++) {
            const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
            this.pincodes.add(randomSixDigitNumber);
        }
        for (let pincode of this.pincodes) {
            //Initially a nil value of 0 is added to all pincodes so that we can create the set
            await redis.sadd(pincode, 0)
        }
        this.pincodes = Array.from(this.pincodes)
    };
    createRandomMerchants = async () => {
        const names = new Set();
        //Replace with the desired number of merchants
        for (let i = 0; names.size < 10000; i++) {
            const name = randomstring.generate({
                length: 10,
                charset: 'alphabetic'
            });
            if (names.has(name)) continue;
            names.add(name);
            let tempArr = _.sample(this.pincodes, _.random(1, 10))
            await redis.sadd(name, tempArr)
            for (let pincode of tempArr) {
                await redis.sadd(pincode, name)
            }
        }
    }
}


//Initialisation
async function init() {
    try {
        let initialise = new Init()
        await initialise.createRandomPincodes();
        await initialise.createRandomMerchants();
        console.log('Initialization completed');
    } catch (error) {
        console.error('Initialization failed:', error);
    }
}
init().then(() => {
    app.listen(8000, () => {
        console.log('Server is running on port 3000');
    });
});