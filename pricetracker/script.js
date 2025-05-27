async function fetchWazirXPrice() {
  try {
    const response = await fetch('https://api.wazirx.com/api/v2/tickers');
    const data = await response.json();
    const usdtInrData = data['usdtinr'];
    if (usdtInrData && usdtInrData.last) {
      document.getElementById('wazirxRate').innerText = `₹${parseFloat(usdtInrData.last).toFixed(2)}`;
    } else {
      document.getElementById('wazirxRate').innerText = "₹Not available";
    }
  } catch (error) {
    console.error('Error fetching WazirX price:', error);
    document.getElementById('wazirxRate').innerText = "₹Not available";
  }
}



async function fetchCoinDCXPrice() {
  try {
    const response = await fetch('https://api.coindcx.com/exchange/ticker');
    const data = await response.json();
    const usdtInr = data.find(pair => pair.market === 'USDTINR');
    if (usdtInr && usdtInr.last_price) {
      document.getElementById('coindcxRate').innerText = `₹${parseFloat(usdtInr.last_price).toFixed(2)}`;
    } else {
      document.getElementById('coindcxRate').innerText = "₹Not available";
    }
  } catch (error) {
    console.error('Error fetching CoinDCX price:', error);
    document.getElementById('coindcxRate').innerText = "₹Not available";
  }
}

function fetchPrices() {
  fetchWazirXPrice();
  fetchCoinDCXPrice();
}

// Fetch prices every 5 seconds
setInterval(fetchPrices, 5000);
fetchPrices();
