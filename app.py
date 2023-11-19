from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///logs.db'
db = SQLAlchemy(app)

def create_app():
    with app.app_context():
        db.create_all()

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.String(50))
    message = db.Column(db.String(255))
    resourceId = db.Column(db.String(50))
    timestamp = db.Column(db.String(50))
    traceId = db.Column(db.String(50))
    spanId = db.Column(db.String(50))
    commit = db.Column(db.String(50))
    parentResourceId = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'level': self.level,
            'message': self.message,
            'resourceId': self.resourceId,
            'timestamp': self.timestamp,
            'traceId': self.traceId,
            'spanId': self.spanId,
            'commit': self.commit,
            'metadata': {
                'parentResourceId': self.parentResourceId
            }
        }

# Log ingestor endpoint
@app.route('/ingest', methods=['POST'])
def ingest():
    data = request.get_json()

    new_log = Log(
        level = data.get('level'),
        message = data.get('message'),
        resourceId = data.get('resourceId'),
        timestamp = data.get('timestamp'),
        traceId = data.get('traceId'),
        spanId  = data.get('spanId'),
        commit = data.get('commit'),
        parentResourceId=data.get('metadata', {}).get('parentResourceId')
    )

    db.session.add(new_log)
    db.session.commit()

    return jsonify({'status': 'Log ingested successfully'})


# Query interface endpoint
@app.route('/query', methods=['GET'])
def query():
    keyword = request.args.get('keyword', '')
    logs = Log.query.filter(Log.message.contains(keyword)).all()
    logsDict = [log.to_dict() for log in logs]
    return render_template('query_result.html', logs=logsDict)


# Default endpoint
@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')

if __name__ == '__main__':
    print("App started")
    app.run(port=3000, debug=True)

