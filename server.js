const express = require("express")
const userModel = require("./models").User;
const roleModel = require("./models").Role;
const userRoleModel = require("./models").UserRole;

const app = express();

app.get("/", (reqq, res) => {
    res.send("Requesting sending 6")
})

//get all user and all roles:
app.get("/users", (req, res) => {
    userModel.findAll({
        include: {
            model: roleModel,
            attributes: [ "name"],
            through: {
                model: userRoleModel
            }
        }
    }).then((data) => {
        res.status(200).json({status: 1, data})
    })
})


//get all roles with respective users:
app.get("/roles", (req, res) => {
    roleModel.findAll({
        include: {
            model: userModel,
            through: {
                model: userRoleModel
            }
        }
    }).then((data) => {
        res.status(200).json({ status: 1, data})
    })
})
app.listen(3001, () => {
    console.log("Server is Running 7")
})