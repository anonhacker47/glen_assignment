import os
from flask import Blueprint, jsonify, request
import json
from utils import cur_path, intervals_overlap, read_json, schedules_data, jobs_data, employees_data, to_datetime, write_json

assign = Blueprint('assign', __name__)

@assign.route('/assign', methods=['POST'])
def assign_employee():
    data = request.get_json()
    employeeId = data.get("employeeId")
    jobId = data.get("jobId")
    
    schedules = read_json(schedules_data)
    jobs = read_json(jobs_data)
    employees = read_json(employees_data)

    
    if not employeeId or not jobId:
        return jsonify({"error": "Invalid Employee or Job not Selected"}), 400
    
    
    job_to_assign = next((j for j in jobs if j["id"] == int(jobId)), None)
    employee = next((e for e in employees if e["id"] == int(employeeId)), None)

    print(job_to_assign,employee)

    if not job_to_assign or not employee:
        return jsonify({"error": "Invalid Employee or Job"}), 400
    
    if not employee["availability"]:
        return jsonify({"error": "Employee is unavailable"}), 400
    
    calculate_start = to_datetime(job_to_assign["startTime"])
    calculate_end = to_datetime(job_to_assign["endTime"])

    for scheduled in schedules:
        if scheduled["employeeId"] == employeeId:
            assigned_job = next((j for j in jobs if j["id"] == scheduled["jobId"]), None)
            assigned_start = to_datetime(assigned_job["startTime"])
            assigned_end = to_datetime(assigned_job["endTime"])

            if intervals_overlap(assigned_start, assigned_end, calculate_start, calculate_end):
                return jsonify({"error": "Employee already assigned to overlapping job"}), 400
    
    schedules.append({"employeeId": int(employeeId), "jobId": int(jobId)})
    write_json(schedules_data, schedules)

    return jsonify({
        "message": "Employee assigned successfully",
        "schedule": schedules
    }), 200

@assign.route('/assign/delete', methods=['DELETE'])
def delete_assignment():
    data = request.get_json()
    schedules = read_json(schedules_data)

    employeeId = data.get("employeeId")
    jobId = data.get("jobId")

    updated_schedules = [
        s for s in schedules if not (s["employeeId"] == employeeId and s["jobId"] == jobId)
    ]

    if len(updated_schedules) == len(schedules):
        return jsonify({"error": "Assignment not found"}), 404

    write_json(schedules_data, updated_schedules)

    return jsonify({
        "message": "Assignment deleted successfully",
    }), 200