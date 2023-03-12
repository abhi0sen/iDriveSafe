import cv2

# Read an image file
img = cv2.imread('../images/image2.jpg')

# Display the image
cv2.imshow('Image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()