const file = process.argv[2];
const colNum = process.argv[3];
const searchVal = process.argv[4];

const fs = require("fs");
const csvParser = require("csv-parser");

const rows = [];

fs.access(file, fs.constants.F_OK, (err) => {
  if (err) {
    console.error("File not found or not accessible");
  } else {
    fs.createReadStream(file)
      .pipe(csvParser({ headers: false }))
      .on("data", (data) => {
        rows.push(data);
      })
      .on("end", () => {
        const result = rows.find((r) => r[colNum] === searchVal);
        if (result) {
          console.log(Object.values(result).join(","));
        } else {
          console.log("No row found");
        }
      })
      .on("error", (error) => {
        console.error("Error reading the file:", error.message);
      });
  }
});
