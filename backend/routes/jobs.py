import os
from flask import Blueprint
import json
from utils import cur_path, read_json, jobs_data

jobs = Blueprint('jobs', __name__)

@jobs.route('/jobs', methods=['GET'])
def get_jobs():
        try:
                return read_json(jobs_data)
                
        except Exception as e:
                return {"error":str(e),"errorMessage":"Invalid Jobs Json Data"},500