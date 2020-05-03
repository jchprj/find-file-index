var fs = require("fs")
const path = require('path')
var folder = "testFolder"
if(fs.existsSync(folder) == false) {
    fs.mkdirSync(folder)
    console.log("Mkdir: " + f)
}
genFiles(folder, "aaa", ".mp3", 11, 15)
genFiles(folder, "sss", ".mp3", 1, 5)
genFiles(folder, "sss", "ddd.mp3", 1, 5)
function genFiles(folder, prefix, suffix, startIndex, endIndex) {
    var array = Array.from( range(startIndex, endIndex, 1) )
    array.forEach(n => {
        var f = folder + path.sep + prefix + n + suffix
        if(fs.existsSync(f) == false) {
            fs.openSync(f, "w+")
            console.log("Created: " + f)
        }
    })
}
function * range ( start, end, step ) {
    let state = start
    while ( state < end ) {
        yield state
        state += step
    }
    return;
};
