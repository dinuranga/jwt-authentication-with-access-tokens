const protected = (req,res) => {
    res.status(200).send("<h1>Hurray!</h1>");
}

module.exports = {
    protected
}