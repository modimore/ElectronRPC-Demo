const {remote} = require("electron")
const zerorpc = remote.require("zerorpc")
const rpc_client = new zerorpc.Client()
rpc_client.connect("tcp://127.0.0.1:4242")

document.addEventListener("DOMContentLoaded", function() {
	rpc_client.invoke("test", function(error, res, more) {
		if (error == null) {
			let resNode = document.createTextNode(res)
			let resSpan = document.getElementById("rpc-result-target")
			resSpan.appendChild(resNode)
		}
		else {
			console.log(error)
		}
	})
	
	let helloNameInput = document.getElementById("hello-name-input")
	let helloTextOutput = document.getElementById("hello-text-output")
	
	rpc_client.invoke("hello", helloNameInput.value, function(error, res, more) {
		if (error == null) {
			let resNode = document.createTextNode(res)
			helloTextOutput.appendChild(resNode)
		}
		else {
			console.log(error)
		}
	})
	
	helloNameInput.addEventListener("change", function(event) {
		rpc_client.invoke("hello", event.target.value, function(error, res, more) {
			if (error == null) {
				let resNode = document.createTextNode(res)
				while (helloTextOutput.firstChild != null) {
					helloTextOutput.removeChild(helloTextOutput.firstChild)
				}
				helloTextOutput.appendChild(resNode)
			}
			else {
				console.log(error)
			}
		})
	})
	
	let streamingStartInput = document.getElementById("streaming-start-input")
	let streamingStopInput = document.getElementById("streaming-stop-input")
	let streamingStepInput = document.getElementById("streaming-step-input")
	let streamingResultTarget = document.getElementById("streaming-result-target")
	
	rpc_client.invoke("stream",
		parseInt(streamingStartInput.value),
		parseInt(streamingStopInput.value),
		parseInt(streamingStepInput.value),
		function(error, res, more) {
			if (!more) {
				return;
			}
			
			if (error == null) {
				let streamedItem = document.createElement("li")
				streamedItem.appendChild(document.createTextNode(res));
				streamingResultTarget.appendChild(streamedItem);
			}
			else {
				console.log(error);
			}
		}
	)
	
	function onStreamingParameterChange(event) {
		let
			start = parseInt(streamingStartInput.value),
			stop  = parseInt(streamingStopInput.value),
			step  = parseInt(streamingStepInput.value)
	
		while(streamingResultTarget.firstChild != null) {
			streamingResultTarget.removeChild(streamingResultTarget.firstChild)
		}
	
		rpc_client.invoke("stream", start, stop, step, function(error, res, more) {
			if (!more) {
				return;
			}
			
			if (error == null) {
				let streamedItem = document.createElement("li")
				streamedItem.appendChild(document.createTextNode(res));
				streamingResultTarget.appendChild(streamedItem);
			}
			else {
				console.log(error);
			}
		})
	}
	
	streamingStartInput.addEventListener("change", onStreamingParameterChange)
	streamingStopInput.addEventListener("change", onStreamingParameterChange)
	streamingStepInput.addEventListener("change", onStreamingParameterChange)
}, {once: true})
