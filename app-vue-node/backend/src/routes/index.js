function route(app) {
    app.use("/", (req, res) => {
        res.send({ a: "aaaaaaaaa" })
    });

}

module.exports = route;
