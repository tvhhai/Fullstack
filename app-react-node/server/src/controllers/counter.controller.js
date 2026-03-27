let counter = 0;

exports.getCounter = (req, res) => {
    res.json({ value: counter });
};

exports.increment = (req, res) => {
    counter += 1;
    res.json({ value: counter });
};
