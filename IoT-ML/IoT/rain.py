import RPi.GPIO as GPIO 
from time import sleep
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

#GPIO.setup(13,GPIO.OUT)  
#while True:
def Rain():
    
    GPIO.setmode(GPIO.BCM)  
    GPIO.setup(23,GPIO.IN)  
    rain = GPIO.input(23)
    if rain==1:
        print("Clean Weather, Not Raining")
        
    elif rain==0:  
        print("It is Raining!!")
    payload = "field6=" + str(rain)
        
    try:
    #print ("Writing Payload = ", payload," to host: ", mqtt_host, " clientID= ", mqtt_client_ID, " User ", mqtt_username, " PWD ", mqtt_password)
        publish.single(topic, payload, hostname=mqtt_host, transport=t_transport, port=t_port, client_id=mqtt_client_ID, auth={'username':mqtt_username,'password':mqtt_password})

    except Exception as e:
        print (e) 
    
    #sleep(1)
