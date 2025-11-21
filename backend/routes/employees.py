import os
from flask import Blueprint
import json
from utils import cur_path, read_json, employees_data

employees = Blueprint('employees', __name__)

@employees.route('/employees', methods=['GET'])
def get_employees():
        try:
                return read_json(employees_data)
        except Exception as e:
                return {"error":str(e),"errorMessage":"Invalid Employees Json Data"},500
                            
