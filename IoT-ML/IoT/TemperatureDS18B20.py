import os
import glob
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



base_dir = '/sys/bus/w1/devices/'
# Get all the filenames begin with 28 in the path base_dir.
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
 
def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    return lines
 
def read_temp():
    lines = read_temp_raw()
    # Find the index of 't=' in a string.
    equals_pos = lines[1].find('t=')
    if equals_pos != -1:
        # Read the temperature .
        temp_string = lines[1][equals_pos+2:]
        temp_c = float(temp_string) / 1000.0
        temp_f = temp_c * 9.0 / 5.0 + 32.0
        payload = "field5=" + str(temp_c)
        
        try:
        #print ("Writing Payload = ", payload," to host: ", mqtt_host, " clientID= ", mqtt_client_ID, " User ", mqtt_username, " PWD ", mqtt_password)
            publish.single(topic, payload, hostname=mqtt_host, transport=t_transport, port=t_port, client_id=mqtt_client_ID, auth={'username':mqtt_username,'password':mqtt_password})

        except Exception as e:
            print (e) 
 
        #return temp_c, temp_f
        print("Surrounding Temperature is ",temp_c, "'C")
 
'''while True:
    print(' C=%3.3f  F=%3.3f'% read_temp())
time.sleep(1)'''