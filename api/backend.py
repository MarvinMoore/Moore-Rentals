from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
import json
import pyodbc
import sqlalchemy as sal
from sqlalchemy import create_engine, text, select, Table, Column, Integer, String, MetaData
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)

# Enable CORS for all routes
CORS(app)


def get_connection():
    return create_engine(
        url='mssql+pyodbc://DESKTOP-HOOIOSE/Cars?trusted_connection=yes&driver=ODBC+Driver+17+for+SQL+Server'
    )
def check_car_availability(make, model):
    try:
       
        # GET THE CONNECTION OBJECT (ENGINE) FOR THE DATABASE
        engine = get_connection()
        result = engine.execute("SELECT * FROM Rentals WHERE Make = '{0}' AND Model = '{1}'".format(make,model))
        for row in result:
            is_free = row['IsFree']
            if is_free == 'yes':
                return row
            elif is_free == 'no':
                return -1
    except Exception as ex:
        print("Connection could not be made due to the following error: \n", ex)

class Cars(Resource):
    def post(self):
        parser = reqparse.RequestParser()  # initialize
        parser.add_argument('make', required=True, location='args')  # add args
        parser.add_argument('model', required=True, location='args')
        parser.add_argument('location', required=True, location='args')
        args = parser.parse_args()  # parse arguments to dictionary

        # read our CSV
        result = check_car_availability(args['make'], args['model'])
        row_dict = dict(result)
        row_json = json.dumps(row_dict)
        if (result == -1):
            return {
                'message': f"No Cars Available"
            }, 409
        return {'car': row_json}, 200  # return data with 200 OK

api.add_resource(Cars, '/cars')  # '/users' is our entry point

if __name__ == '__main__':
    app.run()  # run our Flask app