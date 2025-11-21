from flask import Flask
from flask_cors import CORS

cors = CORS()

def create_app():
    app = Flask(__name__)
    cors.init_app(app)

    from routes.employees import employees
    app.register_blueprint(employees, url_prefix='/api')
    from routes.jobs import jobs    
    app.register_blueprint(jobs, url_prefix='/api')
    from routes.schedule import schedule
    app.register_blueprint(schedule, url_prefix='/api')
    from routes.assign import assign
    app.register_blueprint(assign, url_prefix='/api')

    return app

app = create_app()