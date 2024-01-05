
// render home page
exports.homeRoutes = (req, res) => {
    res.render("invoice");
}

// render product page
exports.productRoutes = (req,res) => {
    res.render('product')
}

// render Customer page
exports.customerRoutes = (req,res) => {
    res.render('customer')
}