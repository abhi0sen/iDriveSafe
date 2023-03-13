import geocoder
from geopy.geocoders import Nominatim
import serial
import time
import string
import pynmea2
import cv2
import numpy as np
import math
import urllib.request
import paho.mqtt.publish as publish

channel_ID = "2061500"

mqtt_host = "mqtt3.thingspeak.com"

# Your MQTT credentials for the device
mqtt_client_ID = "PCEfJSM9Cwo3BSYULiwnNCw"
mqtt_username  = "PCEfJSM9Cwo3BSYULiwnNCw"
mqtt_password  = "OlAVymnEWY4mTMtfc5X5p37F"

t_transport = "websockets"
t_port = 80

topic = "channels/" + "2061500" + "/publish"



x1 = 56.354523
x2 = 76
y1 = 89
y2 = 90

    #print(g.latlng)

def GPS():
    port="/dev/ttyAMA0"
    ser=serial.Serial(port, baudrate=9600, timeout=0.5)
    dataout = pynmea2.NMEAStreamReader()
    newdata=ser.readline().decode('unicode_escape')

    if newdata[0:6] == "$GPRMC":
        newmsg=pynmea2.parse(newdata)
        lat=newmsg.latitude
        lng=newmsg.longitude
        gps = "Latitude=" + str(lat) + " and Longitude=" + str(lng)
        payload = "field3=" + str(lat) + "&field4=" + str(lng)
        
        try:
            publish.single(topic, payload, hostname=mqtt_host, transport=t_transport, port=t_port, client_id=mqtt_client_ID, auth={'username':mqtt_username,'password':mqtt_password})
        except Exception as e:
            print (e)
        
        print(gps)


'''while True:
    #geoco()
    GPS()'''


'''print(math.sqrt(56))

data = (pow(x2-x1, 2)+pow(y2-y1,2))
distance=math.sqrt(data)
print(distance)'''
