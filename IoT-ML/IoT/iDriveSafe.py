import time
import rain
import mpuspeed as spd
import light
import GPS as gps
import TemperatureDS18B20 as temp
import severity as s

while True:
    rain.Rain()
    spd.Speed()
    light.Light()
    gps.GPS()
    temp.read_temp()
    s.Severity()
    time.sleep(1)
