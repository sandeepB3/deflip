const myMiddleware = (req, res, next) => {
    console.log("This is my middleware");
    next(); 
};

module.exports = myMiddleware;
