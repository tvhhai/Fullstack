const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/app_node";

async function connect() {
    try {
        await mongoose.connect(url, {});
        console.log("Connect success");
    } catch (error) {
        console.log("Connect error", error);
    }
}

module.exports = {connect};
