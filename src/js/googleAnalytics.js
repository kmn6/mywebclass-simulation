


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-870X719634');

// Default ad_storage to 'denied' as a placeholder
// Determine actual values based on your own requirements
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'analytics_storage': 'denied'
});

// Define a function to update the gtag consent state
const updateConsentState = (adStorage, analyticsStorage) => {
  gtag('consent', 'update', {
    'ad_storage': adStorage,
    'analytics_storage': analyticsStorage
  });
};

window.addEventListener('load', function() {
    // Get the button element by its ID
    const acceptButton = document.getElementById('acceptBtn');

    acceptButton.addEventListener('click', () => {
    // Call the updateConsentState function with the desired consent state
    updateConsentState('granted', 'granted');
  });
});

  // Add a click event listener to the button


// Check for the privacyAccepted cookie and update the gtag state if present
if (document.cookie.indexOf('privacyAccepted=true') > -1) {
  updateConsentState('granted', 'granted');
}
