const express = require("express")
const app = express()
const fs = require("fs")
const parse = require("csv-parse").parse

app.get("/", function (req, res) {
    try {
        console.log("QUERY", req.query)
        const csv = fs.readFileSync("./data.csv")
        parse(csv, (err, records) => {
            console.log(records)
            let cityObj = {}
            records.map((city, i) => {
                if (i != 0) {
                    if (cityObj[city[0]] == undefined) {
                        cityObj[city[0]] = {}
                    }
                    cityObj[city[0]][city[1]] = parseInt(city[2])


                    console.log(cityObj)
                }

            })
            return res.json({ "data": cityObj[req.query.city] })


            /*
            FUNCTIONALITY TO SORT THE CITIES BASED ON MALE POPULATION
            let dataList = []
            Object.entries(cityObj).map((data) => {
                dataList.push([data[0], data[1]])
            })
            dataList.sort((a, b) => b[1]["Male"] - a[1]["Male"])
            console.log(dataList)
            */


        })
    }
    catch (err) {
        return res.json({ msg: "internal server error" })
    }
})


app.listen(8080, function () {
    console.log("backend connected")
})