import zerorpc

class RPCDemo(object):
	def test(self):
		return "42"
	
	def hello(self, name):
		return "Hello, {0}!".format(name)
	
	@zerorpc.stream
	def stream(self, start, stop, step):
		return range(start, stop, step)

if __name__ == '__main__':
	import sys
	
	port = sys.argv[1];
	
	if port is None:
		sys.exit(1)
	
	server = zerorpc.Server(RPCDemo())
	server.bind("tcp://0.0.0.0:{0}".format(port))
	server.run()
