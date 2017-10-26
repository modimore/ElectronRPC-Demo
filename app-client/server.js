const fs = require("fs")
const path = require("path")
const express = require("express")
const app = express()

const ROOT_PATH = path.join(__dirname, "site-root")
const STATIC_PATH = path.join(ROOT_PATH, "static")

app.use("/", express.static(ROOT_PATH));

module.exports = {
	app: app
}
