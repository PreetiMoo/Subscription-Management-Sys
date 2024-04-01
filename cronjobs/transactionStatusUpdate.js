const axios = require('axios');
const subscription = require('../models/subscriptions');

class TransactionStatusUpdateJob {
    constructor(transactionService) {
        this.transactionService = transactionService;
        this.phonePeApiUrl = "https://api-preprod.phonepe.com/apis/pg-sandbox";
        this.merchantId = process.env.MERCHANT_ID; // Set your merchant ID as an environment variable
        this.saltKey = process.env.SALT_KEY; // Set your salt key as an environment variable
        this.saltIndex = process.env.SALT_INDEX; // Set your salt index as an environment variable
    }

    async updateTransactionStatus() {
        try {
            // Fetch transactions with status PAYMENT_PENDING or PAYMENT_INITIATED
            const transactionsToUpdate = await subscription.findAll({
                where: {
                  status: 'pending'
                }
              });
              
console.log("transaction",transactionsToUpdate)
            for (const transaction of transactionsToUpdate) {
                // Calculate X-VERIFY value
                const apiEndpoint = `/pg/v1/status/${this.merchantId}/${transaction.transaction_ID}`;
                const concatenatedString = apiEndpoint + this.saltKey;
                const sha256Hash = require('crypto').createHash('sha256').update(concatenatedString).digest('hex');
                const checksumValue = sha256Hash + "###" + this.saltIndex;

                // Make the GET request to fetch the current status of the transaction
                const url = this.phonePeApiUrl + apiEndpoint;
                const headers = {
                    'X-VERIFY': checksumValue,
                    'X-MERCHANT-ID': this.merchantId
                };
                const response = await axios.get(url, { headers });

                // Process the response and update the transaction status accordingly
                const responseData = response.data;
                const code = responseData.code;
                transaction.transactionStatus = code;

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
}

module.exports = TransactionStatusUpdateJob;
