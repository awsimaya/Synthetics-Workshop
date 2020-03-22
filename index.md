# Introduction
We will be creating a Canary to test this simple user submission form - http://addressupdater-2049029495.us-east-1.elb.amazonaws.com/ 

Navigate to the link, enter random text in firstname, lastname and address fields. Click on **Update address** button. Repeat it a few times and you will observe that the page randomly says *Unable to update address* which we consider as failure. Our goal is to create a Canary that will identify the failure scenarios and record results automatically.

![results](images/4.png)
# Create a Canary
1. Navigate to [CloudWatch Synthetics](https://console.aws.amazon.com/cloudwatch/home#synthetics:)
2. Click on **Canaries**
3. Click **Create Canary**
![Create Canary](images/1.png)
4. In the next screen, choose **Upload a Script** option
![Upload Script](images/2.png)
5. Download the [Canary.js](canary.js) file and save it in your local location
6. Click on **Browse files** and upload the file you downloaded earlier
7. Enter text **exports.handler** in the **Script entry point** textbox
8. Choose **once per minute** under **Run continuously** drop down. Ensure **Start immediately after creation** checkbox is checked
![Choose options](images/3.png)
9. Leave **Data retention** option as it is
10. Under **Data Storage**, select an S3 bucket that you want the file to be uploaded to and Canary result data to be stored.
11. Under **Access permissions**, select **Create a new role** which will create a new IAM role for Canary execution.
12. Under **Alarms - optional**, select **Enable default alarms for this canary** option
13. Click **Create canary**
14. Wait for a minute or so for the Canary to start and execute. 

# Explore Canary results
1. 