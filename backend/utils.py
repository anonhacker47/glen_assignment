import json
import os
from datetime import datetime, timedelta

cur_path = os.path.dirname(__file__)

schedules_data = os.path.relpath('data\\schedule.json',cur_path)
jobs_data = os.path.relpath('data\\jobs.json',cur_path)
employees_data = os.path.relpath('data\\employees.json',cur_path)


def read_json(path):
    with open(path, 'r') as file:
        return json.load(file)


def write_json(path, data):
    with open(path, 'w') as file:
        json.dump(data, file, indent=4)

def intervals_overlap(start1, end1, start2, end2):
    start1, end1 = normalize_interval(start1, end1)
    start2, end2 = normalize_interval(start2, end2)
    return start1 <= end2 and end1 >= start2

def normalize_interval(start, end):
    if end < start:
        end += timedelta(days=1)
    return start, end


def to_datetime(time_str):
    return datetime.strptime(time_str, "%H:%M")