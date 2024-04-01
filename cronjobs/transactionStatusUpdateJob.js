const cron = require('node-cron');
const axios = require('axios');
const subscription = require('../models/subscriptions');

// Schedule a cron job to run every 5 seconds
cron.schedule('*/5 * * * * *', () => {
  console.log('Running a cron job every 5 seconds');
  // Your cron job logic goes here
  
  updateTransactionStatus()
});

async function updateTransactionStatus() {
  
        const phonePeApiUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox";
        const merchantId = 'PGTESTPAYUAT'; // Set your merchant ID as an environment variable
        const saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'; // Set your salt key as an environment variable
        const saltIndex = 1; // Set your salt index as an environment variable
  try {
  
      // Fetch transactions with status PAYMENT_PENDING or PAYMENT_INITIATED
      const transactionsToUpdate = await subscription.findAll({
          where: {
            payment_status: 'pending'
          }
        });
        

      for (const transaction of transactionsToUpdate) {
          // Calculate X-VERIFY value
          const apiEndpoint = `/pg/v1/status/${merchantId}/${transaction.transaction_ID}`;
          const concatenatedString = apiEndpoint + saltKey;
          const sha256Hash = require('crypto').createHash('sha256').update(concatenatedString).digest('hex');
          const checksumValue = sha256Hash + "###" + saltIndex;

          // Make the GET request to fetch the current status of the transaction
          const url = phonePeApiUrl + apiEndpoint;
          const headers = {
              'X-VERIFY': checksumValue,
              'X-MERCHANT-ID': merchantId
          };
          const response = await axios.get(url, { headers });

          // Process the response and update the transaction status accordingly
          const responseData = response.data;
          const code = responseData.code;
          


          if (code === "PAYMENT_SUCCESS") {
              transaction.payment_status = 'success'                  
          }
          else if (code === "PAYMENT_DECLINED" ) {
              transaction.payment_status = 'failure'                  
          } 
transaction.save()
      }
  } catch (error) {
      console.error("Error updating transaction status:", error);
      throw error;
  }
}