document.getElementById('sendRequest').addEventListener('click', function() {
  var baseUrl = document.getElementById('url').value;
  var method = document.getElementById('method').value;
  var headers = JSON.parse(document.getElementById('headers').value);
  var auth = document.getElementById('auth').value;
  var payload = document.getElementById('payload').value;
  var queryParams = document.getElementById('queryParams').value; // New input field for query params
  var responseDiv = document.getElementById('response');

  // Create the URL with query parameters
  var url = new URL(baseUrl);

  if (queryParams) {
    queryParams = new URLSearchParams(queryParams);
    queryParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });
  }

  var options = {
    method: method,
    headers: headers,
  };

  if (auth) {
    options.headers['Authorization'] = 'Basic ' + btoa(auth);
  }

  if (['POST', 'PUT'].includes(method)) {
    options.body = payload;
  }

  fetch(url.toString(), options)
    .then(response => response.text())
    .then(data => responseDiv.innerHTML = data)
    .catch(error => responseDiv.innerHTML = 'Error: ' + error.message);
});
