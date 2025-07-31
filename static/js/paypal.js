// PayPal Integration for Football App
// Handles donations and betting payments

class PayPalIntegration {
  constructor() {
    this.clientToken = null;
    this.isInitialized = false;
    this.init();
  }

  async init() {
    try {
      // Get client token from backend
      const response = await fetch('/api/paypal/setup');
      const data = await response.json();
      this.clientToken = data.clientToken;
      this.isInitialized = true;
      
      console.log('✅ PayPal integration initialized');
      this.setupDonationButtons();
    } catch (error) {
      console.error('❌ PayPal initialization failed:', error);
      this.showPayPalError('Error inicializando PayPal. Inténtalo más tarde.');
    }
  }

  setupDonationButtons() {
    // Setup donation page PayPal button
    this.setupDonationPageButton();
  }

  setupDonationPageButton() {
    // Check if donation container exists
    const donationContainer = document.getElementById('paypal-button-container-donation');
    if (!donationContainer) return;

    // Clear any existing buttons
    donationContainer.innerHTML = '';

    if (!window.paypal) {
      console.error('PayPal SDK not loaded');
      donationContainer.innerHTML = '<p class="text-red-500 text-center">Error: PayPal no disponible</p>';
      return;
    }

    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'gold',
        shape: 'rect',
        label: 'donate',
        height: 50
      },

      createOrder: async (data, actions) => {
        try {
          const amount = this.getDonationAmount();
          if (!amount || amount <= 0) {
            throw new Error('Cantidad inválida');
          }

          const orderData = {
            intent: 'CAPTURE',
            amount: amount.toString(),
            currency: 'USD'
          };

          const response = await fetch('/api/paypal/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          });

          const order = await response.json();
          
          if (!response.ok) {
            throw new Error(order.error || 'Error creando orden');
          }

          return order.id;
        } catch (error) {
          console.error('Error creating PayPal order:', error);
          this.showPayPalError('Error procesando donación: ' + error.message);
          throw error;
        }
      },

      onApprove: async (data, actions) => {
        try {
          const response = await fetch(`/api/paypal/order/${data.orderID}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              payer_id: data.payerID
            })
          });

          const orderData = await response.json();
          
          if (!response.ok) {
            throw new Error(orderData.error || 'Error capturando pago');
          }

          // Success!
          this.showPayPalSuccess('¡Gracias por tu donación! Tu apoyo es muy valioso.');
          this.trackDonation(this.getDonationAmount());
          
        } catch (error) {
          console.error('Error capturing PayPal payment:', error);
          this.showPayPalError('Error completando donación: ' + error.message);
        }
      },

      onError: (err) => {
        console.error('PayPal error:', err);
        this.showPayPalError('Error en el pago. Por favor intenta de nuevo.');
      },

      onCancel: (data) => {
        console.log('PayPal payment cancelled:', data);
        this.showPayPalInfo('Donación cancelada. ¡Gracias de todas formas!');
      }

    }).render('#paypal-button-container-donation');
  }

  getDonationAmount() {
    const amountSelect = document.getElementById('donation-amount');
    const customAmountInput = document.querySelector('#custom-amount input');
    
    if (!amountSelect) return 10; // Default amount
    
    const selectedValue = amountSelect.value;
    
    if (selectedValue === 'custom') {
      const customAmount = parseFloat(customAmountInput?.value || '0');
      return customAmount > 0 ? customAmount : 10;
    }
    
    return parseFloat(selectedValue) || 10;
  }

  trackDonation(amount) {
    // Track donation for analytics (if needed)
    console.log('💰 Donation tracked:', amount);
    
    // You could send this to an analytics service
    // analytics.track('donation_completed', { amount, currency: 'USD' });
  }

  showPayPalSuccess(message) {
    this.showPayPalMessage(message, 'success');
  }

  showPayPalError(message) {
    this.showPayPalMessage(message, 'error');
  }

  showPayPalInfo(message) {
    this.showPayPalMessage(message, 'info');
  }

  showPayPalMessage(message, type = 'info') {
    // Use the app's toast system if available
    if (window.footballApp && typeof window.footballApp.showToast === 'function') {
      window.footballApp.showToast(message, type);
      return;
    }

    // Fallback to simple alert
    alert(message);
  }

  // Setup betting PayPal integration (for future use)
  setupBettingButton(containerId, betAmount, betData) {
    const container = document.getElementById(containerId);
    if (!container || !window.paypal) return;

    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'pay',
        height: 40
      },

      createOrder: async (data, actions) => {
        try {
          const orderData = {
            intent: 'CAPTURE',
            amount: betAmount.toString(),
            currency: 'USD',
            description: `Apuesta: ${betData.description || 'Liga MX'}`
          };

          const response = await fetch('/api/paypal/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
          });

          const order = await response.json();
          
          if (!response.ok) {
            throw new Error(order.error || 'Error creando apuesta');
          }

          return order.id;
        } catch (error) {
          console.error('Error creating betting order:', error);
          this.showPayPalError('Error procesando apuesta: ' + error.message);
          throw error;
        }
      },

      onApprove: async (data, actions) => {
        try {
          const response = await fetch(`/api/paypal/order/${data.orderID}/capture`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              payer_id: data.payerID
            })
          });

          const orderData = await response.json();
          
          if (!response.ok) {
            throw new Error(orderData.error || 'Error procesando apuesta');
          }

          // Success!
          this.showPayPalSuccess('¡Apuesta registrada exitosamente! Buena suerte!');
          this.trackBet(betAmount, betData);
          
        } catch (error) {
          console.error('Error capturing betting payment:', error);
          this.showPayPalError('Error completando apuesta: ' + error.message);
        }
      },

      onError: (err) => {
        console.error('PayPal betting error:', err);
        this.showPayPalError('Error en la apuesta. Por favor intenta de nuevo.');
      },

      onCancel: (data) => {
        console.log('PayPal betting cancelled:', data);
        this.showPayPalInfo('Apuesta cancelada.');
      }

    }).render(`#${containerId}`);
  }

  trackBet(amount, betData) {
    // Track bet for analytics
    console.log('🎲 Bet tracked:', { amount, betData });
  }
}

// Initialize PayPal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for the PayPal SDK to load
  setTimeout(() => {
    if (window.paypal) {
      window.paypalIntegration = new PayPalIntegration();
    } else {
      console.warn('PayPal SDK not available');
    }
  }, 1000);
});

// Handle donation amount changes
document.addEventListener('change', (e) => {
  if (e.target.matches('#donation-amount')) {
    const customAmountDiv = document.getElementById('custom-amount');
    if (e.target.value === 'custom') {
      customAmountDiv.style.display = 'block';
    } else {
      customAmountDiv.style.display = 'none';
    }
  }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PayPalIntegration;
}

window.PayPalIntegration = PayPalIntegration;