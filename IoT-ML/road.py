import cv2
import numpy as np

# Define a function to extract road region from an image
def extract_road_region(img):
    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Apply a Gaussian blur to remove noise
    blur = cv2.GaussianBlur(gray, (5, 5), 0)

    # Threshold the image to extract the road region
    _, thresh = cv2.threshold(blur, 200, 255, cv2.THRESH_BINARY)

    # Find the contours in the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)

    # Find the contour with the largest area
    largest_contour = max(contours, key=cv2.contourArea)

    # Create a mask for the road region
    mask = np.zeros_like(gray)
    cv2.drawContours(mask, [largest_contour], -1, 255, -1)

    # Apply the mask to the original image to extract the road region
    road_region = cv2.bitwise_and(img, img, mask=mask)

    return road_region

# Define a function to extract road condition features from an image
def extract_features(img):
    # Convert the image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply Canny edge detection
    edges = cv2.Canny(gray, 50, 150)
    
    # Apply a Gaussian blur to remove noise
    blur = cv2.GaussianBlur(edges, (5, 5), 0)
    
    # Threshold the image to extract the road pixels
    thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    
    # Calculate the percentage of white pixels in the image
    total_pixels = img.shape[0] * img.shape[1]
    white_pixels = np.sum(thresh == 255)
    white_pixel_ratio = white_pixels / total_pixels
    
    # Determine the road condition based on the white pixel ratio
    if white_pixel_ratio >= 0.9:
        road_condition = 'Flood'
    elif white_pixel_ratio >= 0.5:
        road_condition = 'Snow'
    elif white_pixel_ratio >= 0.2:
        road_condition = 'Frost/Ice'
    elif white_pixel_ratio >= 0.1:
        road_condition = 'Wet/Damp'
    else:
        road_condition = 'Dry'
    
    return road_condition

# Load the video file
'''cap = cv2.VideoCapture('./media/video.mp4')

# Process each frame of the video
while True:
    # Read a frame from the video
    ret, frame = cap.read()
    print(cap.read())
    if not ret:
        break
    
    # Extract the road region from the frame
    road_region = extract_road_region(frame)
    
    # Extract the road condition from the road region
    road_condition = extract_features(road_region)
    
    # Visualize the predicted road condition in the frame
    print(road_condition)
    cv2.putText(frame, road_condition, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Road Condition Detection', frame)
    if cv2.waitKey(1) == ord('q'):
        break

# Release the video capture and destroy the window
cap.release
print("HRLLP")
'''
# Load the video file
cap = cv2.VideoCapture('./media/video.mp4')

# Process each frame of the video
while True:
    # Read a frame from the video
    ret, frame = cap.read()
    print(cap.read())
    if not ret:
        break
    
    # Extract the road region from the frame
    road_region = extract_road_region(frame)
    
    # Extract the road condition from the road region
    road_condition = extract_features(road_region)
    
    # Visualize the predicted road condition in the frame
    print(road_condition)
    cv2.putText(frame, road_condition, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Road Condition Detection', frame)
    if cv2.waitKey(1) == ord('q'):
        break

# Release the video capture and destroy the window
cap.release()
cv2.destroyAllWindows()