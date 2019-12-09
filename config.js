const config = {
 port: process.env.PORT || 5000,
 db: process.env.DB || 'mongodb://mongo:27017/WeightTracker'
};

module.exports = config;