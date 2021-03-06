# Introduction
We will be creating a Canary to test this simple user submission form - http://addressupdater-2049029495.us-east-1.elb.amazonaws.com/ 

Navigate to the link, enter random text in firstname, lastname and address fields. Click on **Update address** button. Repeat it a few times and you will observe that the page randomly says *Unable to update address* which we consider as failure. Our goal is to create a Canary that will identify the failure scenarios and record results automatically.

![results](images/4.png)
# Create a Canary
1. Navigate to [CloudWatch Synthetics](https://us-east-2.console.aws.amazon.com/cloudwatch/home#synthetics:)
2. Click on **Canaries**
3. Click **Create Canary** and give it a unique name so there is no conflict with other lab users
![Create Canary](images/1.png)
4. In the next screen, choose **Upload a Script** option
![Upload Script](images/2.png)
5. Download the [Canary.js](canary.js) file and save it in your local location
6. Click on **Browse files** and upload the file you downloaded earlier
7. Enter text **exports.handler** in the **Script entry point** textbox
8. Choose **once per minute** under **Run continuously** drop down. Ensure **Start immediately after creation** checkbox is checked
![Choose options](images/3.png)
9. Leave **Data retention** option as it is
10. Under **Data Storage**, you should see an S3 bucket already chosen for you. Leave it as it is.
11. Under **Access permissions**, select **Select an existing role** and select **Synthetics-Role**
12. Click **Create canary**
13. Wait for a minute or so for the Canary to start and execute

# Explore Canary results
1. Navigate to [Canaries home page](https://console.aws.amazon.com/cloudwatch/home#synthetics:canary/list)
2. Click on the Canary you created, which will take you to the **Summary** page
![Canary details](images/5.png)
3. Change the durartion to **1 hr**
4. Based on the execution result status, you will see either Blue or Red dots.Blue indicates a successful respose, while Red indicates a failure scenario.
5. Click on a dot and check out the **Screenshots** tab. Scroll down to see all the scrrenshots the Canary took as part of the execution process.
6. Go to **HAR File** tab and check out the HTTP Archive data for the request and responses from the application
7. Go to **Logs** tab to see the details on each execution step. In particular, pay attention to how the error details as shown below. If you're exploring a failed result, you should see log entries similar to the one below
![Error](images/6.png)
8. Now go to **Metrics** tab at the top left. Here you will see the Lambda execution metric widgets. This shows details about the Lambda function that was executed as part of the Canary.
9. Navigate to **Configuration** tab and check out more details about the Canary and the Canary script
10. Go to [CloudWatch Metrics](https://console.aws.amazon.com/cloudwatch/home#metricsV2:). Click on **CloudWatchSynthetics** namespace
11. Click on any dimension to check out the metrics the Canary is publishing. As always, you can click on a metric to create line graphs and also setup Anomaly Detection by clicking on the graph icon
![](images/7.png)
![](images/8.png)
 
# Use case for Synthetics
Amazon CloudWatch Synthetics enables you to create canaries to monitor your endpoints and APIs. Canaries are configurable scripts that follow the same routes and perform the same actions as a customer. This enables the outside-in view of your customers’ experiences, and your service’s availability from their point of view.

You can run a canary once, or on a regular schedule. Scheduled canaries can run 24 hours a day, as often as once per minute. The canaries check the availability and latency of your endpoints, and can store load time data and screenshots of the UI.

You can create canaries to test your applications automatically in production to identify problems in business functionalies before your customers are affected. Test API endpoints, user workflows, site responsiveness etc easily and collect execution results instantly. 