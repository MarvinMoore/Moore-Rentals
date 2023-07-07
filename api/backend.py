from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import ast
from flask_cors import CORS
app = Flask(__name__)
api = Api(app)

# Enable CORS for all routes
CORS(app)

def check_car_availability(make, model):
        df = pd.read_csv('moore-rentals-cars.csv')
        car = df[(df['Make'] == make) & (df['Model'] == model)]
        if not car.empty:
            if car['isFree'].values[0] == 'yes':
                return car.to_dict('records')[0]
            else:
                return -1
        return -1

class Cars(Resource):
    def post(self):
        parser = reqparse.RequestParser()  # initialize
        parser.add_argument('make', required=True, location='args')  # add args
        parser.add_argument('model', required=True, location='args')
        parser.add_argument('location', required=True, location='args')
        args = parser.parse_args()  # parse arguments to dictionary

        # read our CSV
        result = check_car_availability(args['make'], args['model'])

        if (result == -1):
            return {
                'message': f"No Cars Available"
            }, 409
        return {'car': result}, 200  # return data with 200 OK


api.add_resource(Cars, '/cars')  # '/users' is our entry point

if __name__ == '__main__':
    app.run()  # run our Flask app