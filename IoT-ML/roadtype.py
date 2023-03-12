def detect_road_type(road_width, num_lanes, has_roundabout, is_slip_road):
    if is_slip_road:
        return "Slip road"
    elif has_roundabout:
        return "Roundabout"
    elif num_lanes == 1:
        return "One way street"
    elif num_lanes == 2 and road_width < 7:
        return "Single carriageway"
    elif num_lanes == 2 and road_width >= 7:
        return "Dual carriageway"
    else:
        return "Unknown road type"

# Example usage
road_width = 10.5
num_lanes = 2
has_roundabout = False
is_slip_road = False

road_type = detect_road_type(road_width, num_lanes, has_roundabout, is_slip_road)
print(f"The detected road type is: {road_type}")

