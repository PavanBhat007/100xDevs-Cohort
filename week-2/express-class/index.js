const express = require("express");

var users = [{ name: "abc", kidneys: [{ healthy: false }] }];

const app = express();
app.use(express.json()); // to parse json in body

// utility function to validate user input
function atleastOneUnhealthy(kidneys) {
    let atleast1 = 0;
    kidneys.forEach((kidney, _) => {
        !kidney.healthy ? atleast1++ : _;
    });

    if(atleast1 != 0) return 1;
    return 0;
}

// retrieve all kidneys
app.get("/", (_, res) => {
  const userKidneys = users[0].kidneys;
  const numberOfKidneys = userKidneys.length;

  let numberOfHealthyKidneys = 0,
    numberOfUnealthyKidneys = 0;

  userKidneys.forEach((kidney, _) => {
    kidney.healthy ? numberOfHealthyKidneys++ : numberOfUnealthyKidneys++;
  });

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnealthyKidneys,
  });
});

// add a new kidney
app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });

    res.json({
        msg: "Done!"
    })
});

// heal all kidneys (all unhealthy become healthy)
app.put("/", (_, res) => {
    let userKidneys = users[0].kidneys;

    if(atleastOneUnhealthy(userKidneys)) {
        userKidneys.forEach((kidney, _) => {
            kidney.healthy = true;
        });
        
        users[0].kidneys = userKidneys;
        res.json({
            msg: "Done!"
        });
    } else {
        res.status(411).json({
            msg: "No bad kidneys!"
        });
    }
    
});

// remove all unhealthy kidneys
app.delete("/", (_, res) => {
    let userKidneys = users[0].kidneys;
    
    if(atleastOneUnhealthy(userKidneys)){
        userKidneys.forEach((kidney, i) => {
            kidney.healthy ? _ : userKidneys.pop(i) ;
        });
    
        users[0].kidneys = userKidneys;
        res.json({
            msg: "Done!"
        });
    } else {
        res.status(411).json({
            msg: "No bad kidneys!"
        });
    }
});

app.listen(3000, () => {
  console.log("Hospital open at 3000 ...");
});
