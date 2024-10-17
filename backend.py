import flask
from flask import request
import queue
from flask_cors import CORS, cross_origin
from twilio.rest import Client
class MessageAnnouncer:

    def __init__(self):
        self.listeners = []

    def listen(self):
        q = queue.Queue(maxsize=5)
        self.listeners.append(q)
        return q

    def announce(self, msg):
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(msg)
            except queue.Full:
                del self.listeners[i]

def format_sse(data: str, event=None) -> str:
    msg = f'data: {data}\n\n'
    if event is not None:
        msg = f'event: {event}\n{msg}'
    return msg

app = flask.Flask(__name__)
eventAnnouncer = MessageAnnouncer()
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/')
@cross_origin()
def hello_world():
    return 'Hello, World!'

@cross_origin()
@app.route('/listen', methods=['GET'])
def listen():

    def stream():
        messages = eventAnnouncer.listen()  # returns a queue.Queue
        while True:
            msg = messages.get()  # blocks until a new message arrives
            yield msg

    return flask.Response(stream(), mimetype='text/event-stream')

@cross_origin()
@app.route('/api/coords')
def coordinates():
    latitude = request.args.get('latitude')
    longitude = request.args.get('longitude')
    # latitude, longitude = request.GET
    msg = format_sse(data=f'{latitude}-{longitude}')
    eventAnnouncer.announce(msg=msg)
    account_sid = ''
    auth_token = ''
    client = Client(account_sid, auth_token)
    message = client.messages.create(
    from_='+13347817869',
    body=f"""THIS IS A SOS CALL
    http://maps.google.com/maps?q={latitude},{longitude}""",
    to='+917726060669'
    )
    return {}, 200


if __name__ == "__main__":
    app.run("0.0.0.0")