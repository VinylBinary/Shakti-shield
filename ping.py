import time
import requests

print(requests.get('http://192.168.66.30:5000/api/coords', params = 
                {'latitude' : 26.895315375411307,
                'longitude' : 75.78300474957236}))

 