import urllib.request
import json
import time

channel_ID = "2061500"

mqtt_host = "mqtt3.thingspeak.com"

mqtt_client_ID = "PCEfJSM9Cwo3BSYULiwnNCw"
mqtt_username  = "PCEfJSM9Cwo3BSYULiwnNCw"
mqtt_password  = "OlAVymnEWY4mTMtfc5X5p37F"

t_transport = "websockets"
t_port = 80

topic = "channels/" + "2061500" + "/subscribe"

READ_API_KEY='CG50D1N7SZQ4ETMZ'
CHANNEL_ID= '2061500'

def Severity():
    url = "http://api.thingspeak.com/channels/{}/fields/7/last.json?api_key={}".format(CHANNEL_ID, READ_API_KEY)
    response = urllib.request.urlopen(url)
    data_field7 = json.loads(response.read())

    severity = int(data_field2["field7"])

    if severity == 1:
        print("HIGH RISK, PLEASE CONTROL YOUR SPEED")
    elif severity == 2:
        print("AVERAGE RISK, PLEASE BE CAREFULL")
    else:
         print("Normal Risk, Hava a good day ahead")
