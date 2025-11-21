import os
from flask import Blueprint
import json
from utils import cur_path, read_json

schedule = Blueprint('schedule', __name__)
schedules_data = os.path.relpath('data\\schedule.json',cur_path)

@schedule.route('/schedule', methods=['GET'])
def get_schedule():
        try:
                return read_json(schedules_data)
        except Exception as e:
                return {"error":str(e),"errorMessage":"Invalid Schedules Json Data"},500