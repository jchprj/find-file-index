This tool takes 3 optional parameters, output is a preview that all files in the folder could be renamed by an index extracted from filenames.

# Command
```
node findfileindex.js folder pattern unrenamedFilesPattern
```
## Parameters

* folder  
Default value: current folder

* pattern  
Default value: $1 => $2_$1  
Show preview of rename output, $1 means source filename, $2 means extracted index if any  

* unrenamedFilesPattern  
Default value: false, means don't show unrenamed files.  
Determine if output contains unrenamed files, $1 means source filename, no $2 cause no extracted index  

# Examples

- case 1  
```
sss1.mp3 => 1_sss1.mp3
sss2.mp3 => 2_sss2.mp3
sss3.mp3 => 3_sss3.mp3
sss4.mp3 => 4_sss4.mp3
```

- case 2, not well supported yet  
```
sss1.mp3 => sss1.mp3
sss1ddd.mp3 => sss1ddd.mp3
sss2.mp3 => sss2.mp3
sss2ddd.mp3 => sss2ddd.mp3
sss3.mp3 => sss3.mp3
sss3ddd.mp3 => sss3ddd.mp3
sss4.mp3 => sss4.mp3
```

# Test

`test.js` will create some files in folder `testfolder`, then could run `findfileindex.js` with `testfolder` as parameter to see the result.

# Optimization

* Could support more complex cases
* Use some command library for parameters
* Add leading 0 in case of large numbers
* ...