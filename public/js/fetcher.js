function fetchData(url, action) {
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            action(myJson);
        });
}
