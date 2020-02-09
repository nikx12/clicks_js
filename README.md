# clicks_js
### Test Assessment

Have made use of node and npm.

### Requirements
Given an array of clicks, return the subset of clicks where:

1. For each IP within each one hour period, only the most expensive click is placed into the result set.
2. If more than one click from the same IP ties for the most expensive click in a one hour period, only place the earliest click into the result set.
3. If there are more than 10 clicks for an IP in the overall array of clicks, do not include any of those clicks in the result set. The result set should be stored in an array of hashes. Each hash should represent a click.
The expected result set should be a subset of the original array.

### Prerequisites
Please make sure that NODE is installed on the device where this code needs to be run. NPM will be used to run any command from shell/terminal to run the code.

#### Test Cases
Mocha is used for writing test in this. Test cases are written only on basic level for now.

### List of Files Used

1. `index.js` - The main file that will execute the code and call the required functions with the actual data (json data).
 2. `computeData.js` - Main logic function, that accets the `clicks_object` array and return the resulted array.
 3. `saveFileToJSON.js` - Saves the array recieved as argument to the JSON file.
 4. `test.js` - Executes test cases.
 5. `test_inputs.js` - Holds the Test file's input and output data.

 ### Installation Process

 First, unzip the folder and open the terminal on the extracted folder.
 Use the package manager npm to install all the required packages using the terminal by using command npm i or npm install

 ### Running the code
 To run the solution
    npm run solution

 To run the test cases
    npm run test
