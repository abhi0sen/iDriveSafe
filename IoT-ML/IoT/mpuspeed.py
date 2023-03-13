import smbus #import SMBus module of I2C
from time import sleep          #import
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

#some MPU6050 Registers and their Address
PWR_MGMT_1   = 0x6B
SMPLRT_DIV   = 0x19
CONFIG       = 0x1A
GYRO_CONFIG  = 0x1B
INT_ENABLE   = 0x38
ACCEL_XOUT_H = 0x3B
ACCEL_YOUT_H = 0x3D
ACCEL_ZOUT_H = 0x3F
GYRO_XOUT_H  = 0x43
GYRO_YOUT_H  = 0x45
GYRO_ZOUT_H  = 0x47


def MPU_Init():
#write to sample rate register
    bus.write_byte_data(Device_Address, SMPLRT_DIV, 7)
    
#Write to power management register
    bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)

    #Write to Configuration register
    bus.write_byte_data(Device_Address, CONFIG, 0)
    
    #Write to Gyro configuration register
    bus.write_byte_data(Device_Address, GYRO_CONFIG, 24)

#Write to interrupt enable register
    bus.write_byte_data(Device_Address, INT_ENABLE, 1)
    
def read_raw_data(addr):
    #Accelero and Gyro value are 16-bit
    high = bus.read_byte_data(Device_Address, addr)
    low = bus.read_byte_data(Device_Address, addr+1)
    
        #concatenate higher and lower value
    value = ((high << 8) | low)
        
        #to get signed value from mpu6050
    if(value > 32768):
        value = value - 65536
    return value


bus = smbus.SMBus(1)  # or bus = smbus.SMBus(0) for older version boards
Device_Address = 0x68   # MPU6050 device address

MPU_Init()

print (" Reading Data of Gyroscope and Accelerometer")

#while True:
def Speed():
    #Read Accelerometer raw value
    acc_x = read_raw_data(ACCEL_XOUT_H)
    acc_y = read_raw_data(ACCEL_YOUT_H)
    acc_z = read_raw_data(ACCEL_ZOUT_H)

    #Full scale range +/- 250 degree/C as per sensitivity scale factor
    Ax = pow(acc_x/16384.0, 2)
    Ay = pow(acc_y/16384.0, 2)
    Az = pow(acc_z/16384.0, 2)
    speed = math.sqrt(Ax+Ay+Az)
    print ("Ax=%.2f g" %speed)

    #Read Gyroscope raw value
    gyro_x = read_raw_data(GYRO_XOUT_H)
    gyro_y = read_raw_data(GYRO_YOUT_H)
    gyro_z = read_raw_data(GYRO_ZOUT_H)
    
    Gx = gyro_x/131.0
    Gy = gyro_y/131.0
    Gz = gyro_z/131.0
    
    
    payload = "field1=" + str(speed)
        
    try:
    #print ("Writing Payload = ", payload," to host: ", mqtt_host, " clientID= ", mqtt_client_ID, " User ", mqtt_username, " PWD ", mqtt_password)
        publish.single(topic, payload, hostname=mqtt_host, transport=t_transport, port=t_port, client_id=mqtt_client_ID, auth={'username':mqtt_username,'password':mqtt_password})

    except Exception as e:
        print (e) 
    #print(speed)
    #print ("Gx=%.2f" %Gx, u'\u00b0'+ "/s", "\tGy=%.2f" %Gy, u'\u00b0'+ "/s", "\tGz=%.2f" %Gz, u'\u00b0'+ "/s", "\tAx=%.2f g" %Ax, "\tAy=%.2f g" %Ay, "\tAz=%.2f g" %Az) 	
    #sleep(1)