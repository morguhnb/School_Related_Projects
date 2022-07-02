A color-blindness oriented web-based photo editor using a python flask and html.

My reponsibilities for this project primarily involved establishing the flask application, and the image processing.

The image processing is done in python using cv2 and numpy. 
The idea behind our photo editor was to spot treat an image pixel by pixel, rather than filter an entire image.
We found many photo editors, but none dedicated to color blindness, and even fewwer that were web based. 
Our approach focused only on correcting pixels within color ranges that were difficult for different color blindnesses in order to maintain the most natural looking
image possible, as close to its original form as possible. 

Our filters were designed using real user feedback from colorblind volunteers on social media, and via Google surveys.
