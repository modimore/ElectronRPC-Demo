## Electron RPC Demo ##
This Electron application is a proof-of-concept for [ZeroRPC][zerorpc] as a data
provider for an [Electron][electron] application.

## Architecture ##
The example consists of three parts which together can be used as a template
for creating more complex Electron applications. In addition to these there is
also a JS file that start and stops all of the components.

#### ZeroRPC Server ####
Here, the RPC server is a Python file that defines the class whose methods
are exposed to the client. When run as a script it also creates an RPC server
and listens on the specified port.

#### Express Application ####
We are using Express to serve our front-end materials. In this minimal example
it is being used as a static file server, but this setup provides a direction
for increasing the complexity of the server logic.

#### Browser Window ####
HTML, CSS, and JavaScript combine to provide the user interface for this
application. The "client-side" code expects access to the project's Node.js
modules in order to communicate with the RPC server.

#### Launch Script ####
This file initializes the critical components of the application:
the Electron browser, the Express server, and the Python script for the
ZeroRPC server.

## Setup ##
Since this project is written in two languages each with a separate runtime,
setting up both a Node.js/Electron and Python environment for the project is
necessary. ZeroMQ should be set up before both environments.

*Note: Where OS-specific, scripts included in this repo are for Windows.*

#### General ####
1. Install [ZeroMQ][zeromq]

#### Node.js/Electron Setup ####
1. Ensure that you have a working setup for [node-gyp][node-gyp]
  - This will involve installing Python 2.7 (whether or not you want the python
    part of your application to use Python 3) and a C/C++ compiler toolchain
    for your platform if you do not already have these.
2. Run `npm install` for the project

#### Python Setup ####
One command will pretty much get you up and running.

1. Run `pip install zerorpc`

For development, creating a virtualenv is not strictly necessary. The scripts
included in this example use one because it is good practice, but also because
it makes a working Python interpreter available to distributions created with
electron-packager for the same platform. Without it, either an existing Python
installation must be relied upon or the Python parts of the application must be
bundled another way.

[zerorpc]: http://www.zerorpc.io
[electron]: https://www.electron.atom.io
[zeromq]: http://zeromq.org/
[node-gyp]: https://github.com/nodejs/node-gyp/
