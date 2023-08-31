const axios = require('axios');

class PouchiiModule {
  constructor() {
    this.baseUrl = "https://stagingapi.pouchii.net/api/";
    this.bearerToken = process.env.JWT_TOKEN; // Make sure you have the JWT_TOKEN set in your environment
  }

  async validateMeter(meterData) {
    return this.sendRequest("itex/validate/meter", 'POST', meterData);
  }

  async purchaseElectricity(purchaseData) {
    return this.sendRequest("itex/purchase/electricity", 'POST', purchaseData);
  }

  async sendRequest(endpoint, method, requestData) {
    const apiUrl = this.baseUrl + endpoint;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bearerToken}`
    };
    
    console.log("API URL:", apiUrl);
    
    try {
      const response = await axios({
        method: method,
        url: apiUrl,
        headers: headers,
        data: requestData
      });

      return response.data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }
}

module.exports = PouchiiModule;
