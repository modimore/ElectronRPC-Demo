const {app, BrowserWindow} = require("electron")
const {spawn} = require("child_process")
const path = require("path")
const url = require("url")

const EXPRESS_PORT = 3000
const RPC_PORT = 4242
const EXPRESS_BASE_URL = url.format({
	protocol: "http:",
	slashes: true,
	host: `127.0.0.1:${EXPRESS_PORT}`,
	pathname: "/"
})

let mainWindow, expressServer, apiProc

function startApp() {
	apiProc = spawn("python", [path.join(__dirname, "api-server/rpc_server.py"), RPC_PORT])
	
	let expressApp = require("./app-client/server.js").app
	if (expressApp) {
		expressServer = expressApp.listen(EXPRESS_PORT)
	}
	
	mainWindow = new BrowserWindow({
		show: false
	})

	mainWindow.loadURL(EXPRESS_BASE_URL)
	
	mainWindow.on("closed", function () {
		mainWindow = undefined
	})
	
	mainWindow.maximize()
	mainWindow.show()
}

function stopApp() {
	if (expressServer) {
		expressServer.close()
	}

	if (apiProc) {
		apiProc.kill()
	}

	app.quit()
}

app.on("ready", startApp)

app.on("window-all-closed", function() {
	if (!process.platform.startsWith("darwin")) {
		stopApp()
	}
})

app.on("activate", function() {
	if (mainWindow == undefined) {
		startApp()
	}
});
