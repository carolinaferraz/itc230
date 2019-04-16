var colors = [
    {name: "white", hex:"#FFFFFF", rgb:"(255,255,255)"},
    {name: "green", hex:"#008000", rgb:"(0,128,0)"},
    {name: "pink", hex:"#FFC0CB", rgb:"(255,192,203)"},
    {name: "black", hex:"#000000", rgb:"(0,0,0)"},
    {name: "red", hex:"#FF0000", rgb:"(255,0,0)"},
];
// getAll method that returns all array items
exports.getAll = () => {
    return colors;
};

//get method to return the requested array item
exports.get = (name) => {
    return colors.find((item) => {
        return item.name === name;
    });
};

//a delete method to delete the requested item from your array
exports.delete = (name) => {
    colors = colors.filter(item => item !== name);
        return colors;
    };

