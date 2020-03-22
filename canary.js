var synthetics = require('Synthetics');
const log = require('SyntheticsLogger');

const flowBuilderBlueprint = async function () {
    // INSERT URL here
    let url = "http://addressupdater-2049029495.us-east-1.elb.amazonaws.com/";

    let page = await synthetics.getPage();

    // Navigate to the initial url
    await synthetics.executeStep('navigateToUrl', async function (timeoutInMillis = 30000) {
        await page.goto(url, {waitUntil: ['load', 'networkidle0'], timeout: timeoutInMillis});
    });

    // Execute customer steps
    await synthetics.executeStep('customerActions', async function () {
        await page.type("[id='firstName']", "sample first name");
        try {
            await synthetics.takeScreenshot("input", 'result');
        } catch(ex) {
            synthetics.addExecutionError('Unable to capture screenshot.', ex);
        }

        await page.type("[id='lastName']", "sample last name");
        try {
            await synthetics.takeScreenshot("input", 'result');
        } catch(ex) {
            synthetics.addExecutionError('Unable to capture screenshot.', ex);
        }

        await page.type("[id='address']", "address text");
        try {
            await synthetics.takeScreenshot("input", 'result');
        } catch(ex) {
            synthetics.addExecutionError('Unable to capture screenshot.', ex);
        }
        
        await page.waitForSelector("[id='submitform']", { timeout: 30000 });
        await page.click("[id='submitform']");
        try {
            await synthetics.takeScreenshot("click", 'result');
        } catch(ex) {
            synthetics.addExecutionError('Unable to capture screenshot.', ex);
        }
        
        await page.waitForXPath("//label[@id='statusmessage'][contains(text(),'Address updated successfully.')]", { timeout: 5000 });
        try {
            await synthetics.takeScreenshot("verifyText", 'result');
        } catch(ex) {
            synthetics.addExecutionError('Unable to capture screenshot.', ex);
        }


    });
};

exports.handler = async () => {
    return await flowBuilderBlueprint();
};