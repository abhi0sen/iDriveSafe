import RPi.GPIO as GPIO
import time
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

#GPIO.setmode(GPIO.BCM)
delayt = 0.1 
value = 0 # this variable will be used to store the ldr value
ldr = 27 #ldr is connected with pin number 7
 
def rc_time (ldr):
    count = 0

    #Output on the pin for
    GPIO.setup(ldr, GPIO.OUT)
    GPIO.output(ldr, False)
    time.sleep(delayt)

    #Change the pin back to input
    GPIO.setup(ldr, GPIO.IN)

    #Count until the pin goes high
    while (GPIO.input(ldr) == 0):
        count += 1

    return count


#Catch when script is interrupted, cleanup correctly
try:
    # Main loop
    #while True:
    def Light():
        light = rc_time(ldr)
        print("Ldr Value:", light)
        payload = "field2=" + str(light)
        
        try:
        #print ("Writing Payload = ", payload," to host: ", mqtt_host, " clientID= ", mqtt_client_ID, " User ", mqtt_username, " PWD ", mqtt_password)
            publish.single(topic, payload, hostname=mqtt_host, transport=t_transport, port=t_port, client_id=mqtt_client_ID, auth={'username':mqtt_username,'password':mqtt_password})

        except Exception as e:
            print (e) 

except KeyboardInterrupt:
    pass