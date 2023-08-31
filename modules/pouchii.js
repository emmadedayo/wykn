class PouchiiModule {
    constructor() {
      this.baseUrl = "https://stagingapi.pouchii.net/api/";
      this.bearerToken = process.env.JWT_TOKEN; // Make sure you have the BEARER_TOKEN set in your environment
    }
  
    async validateMeter(meterData) {
      return this.sendRequest("itex/validate/meter", 'POST', meterData);
    }
  
    async purchaseElectricity(purchaseData) {
      return this.sendRequest("itex/purchase/electricity", 'POST', purchaseData);
    }
  
    async sendRequest(endpoint, method, requestData) {
      const apiUrl = this.baseUrl + endpoint;
      const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.bearerToken}`
        },
        body: JSON.stringify(requestData)
      };
      console.log("API URL:", requestOptions);
      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('API request error:', error);
        throw error;
      }
    }
  }
  
  module.exports = PouchiiModule;
