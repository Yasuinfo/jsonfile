document.getElementById('sendRequest').addEventListener('click', function() {
  var url = document.getElementById('url').value;
  var method = document.getElementById('method').value;
  var headers = JSON.parse(document.getElementById('headers').value);
  var auth = document.getElementById('auth').value;
  var payload = document.getElementById('payload').value;
  var responseDiv = document.getElementById('response');

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

  fetch(url, options)
    .then(response => response.text())
    .then(data => responseDiv.innerHTML = data)
    .catch(error => responseDiv.innerHTML = 'Error: ' + error.message);
});
