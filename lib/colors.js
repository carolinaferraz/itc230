//MODEL

let colors = [
    {name: "white", hex:"#FFFFFF", rgb:"(255,255,255)"},
    {name: "green", hex:"#008000", rgb:"(0,128,0)"},
    {name: "pink", hex:"#FFC0CB", rgb:"(255,192,203)"},
    {name: "black", hex:"#000000", rgb:"(0,0,0)"},
    {name: "red", hex:"#FF0000", rgb:"(255,0,0)"},
];


//add method
exports.add = (newColor) => { 
    let name = newColor.name;
    
    if (this.get(name) === undefined) {
        colors.push(newColor);
        return newColor;
    } else {
        return "color already exists!";
    }
}
        
// getAll method that returns all array items
exports.getAll = () => {
    return colors;
};

//a delete method to delete the requested item from your array
exports.delete = (name) => {
    let result = '';
    let indexNumber = colors.findIndex((color) => {
        return color.name == name;
    })
    if (indexNumber > -1) {
       colors.splice(indexNumber,1);
       result = true;
    } else {
        result = false;
    }
    return {result: result, count: colors.length}
};

//get method to return the requested array item
exports.get = (name) => {
    return colors.find((item) => {
        return item.name === name;
    });
};