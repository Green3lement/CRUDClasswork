var courses = [
    {
        title: "Chocolate Fudge",
        cost: 50
    },
    {
        title: "Fries",
        cost: 150
    },
    {
        title: "Cat",
        cost: 500
    },

]

module.exports = {
    index: (req, res) => {
        res.render("index");
    } 
}