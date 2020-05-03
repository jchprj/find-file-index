
var fs = require("fs")
var util = require("util")
var path = process.argv.length > 2 ? process.argv[2] : require("path").sep;
var pattern = process.argv.length > 3 ? process.argv[3] : "$1 => $2_$1";
var unrenamedFilesPattern = process.argv.length > 4 ? process.argv[4] : false;
console.log(pattern)
console.log("Folder to be processed: " + path);
console.log("\n");
var files = fs.readdirSync(path);
// console.log(files.length);
var last = "";
var lastResult = -1;
var index = 0;
var total = 0;
files.sort().forEach(f => {
    // console.log(f, last);
    var result = compareNames(f, last);
    if(result != -1) {
        //If current one could extract number, also output last one if last one could not extract number, means last one is first one of a number sequence
        if(lastResult == -1) {
            output(last, result[1]);
        }
        output(f, result[0]);
    }else{
        //If last one extracted, it was already output
        if(last != "" && lastResult == -1) {
            output(last);
        }
        if(index >= files.length) {
            output(f);
        }
    }
    lastResult = result;
    last = f;
})
function output(f, result) {
    if(result >= 0) {
        total++;
        var s = pattern.replace(/\$1/g, f);
        s = s.replace(/\$2/g, result);
        console.log(s);
    }else if(unrenamedFilesPattern != false) {
        var s = unrenamedFilesPattern.replace(/\$1/g, f);
        console.log(s);
    }
}
console.log("\n");
console.log("Total files: ", files.length);
console.log("Renamed files: ", total);

//If could extract number differs from two strings, return the two numbers from both strings, otherwise return -1
function compareNames(n1, n2) {
    if(n1 == "" || n2 == "") {
        return -1;
    }
    var len1 = n1.length;
    var len2 = n2.length;
    var start = -1;
    var end = -1;
    var lastIsEqual = true;
    for(var i = 0; i < len1; i++) {
        if(n1[i] != n2[i]) {
            var isNumber = isNaN(Number(n1[i])) == false && isNaN(Number(n2[i])) == false;
            // console.log(n1[i], n2[i], isNumber);
            if(isNumber == false) {
                return -1;
            }
            if(start == -1) {
                start = i;
            }
            if(end == -1) {
                end = i;
            }
            if(lastIsEqual == false && end != -1) {
                end = i;
            }
            lastIsEqual = false;
        }else{
            if(lastIsEqual == false) {
                break;
            }
            lastIsEqual = true;
        }
    }
    // console.log(n1[start], n2[end]);
    if(start != -1 && end != -1) {
        for(var i = start - 1; i >= 0; i--) {
            var isNumber = isNaN(Number(n1[i])) == false;
            if(isNumber) {
                start--;
            }else{
                 break;
            }
        }
        for(var i = end + 1; i < len1 && i < len2; i++) {
            var isNumber = isNaN(Number(n1[i])) == false;
            if(isNumber) {
                end++;
            }else{
                 break;
            }
        }
        // console.log(n1[start], n2[end], isNumber);
        return [n1.substring(start, end + 1), n2.substring(start, end + 1)];
    }
    return -1;
}

