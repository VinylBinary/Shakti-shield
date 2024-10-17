import sseclient

messages = sseclient.SSEClient('http://192.168.227.30:5000/listen')

for msg in messages:
    print(msg)
