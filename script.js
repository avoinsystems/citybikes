function refreshNumbers() {
    fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
                bikeRentalStation(id: "131") {
                    stationId
                    name
                    bikesAvailable
                    spacesAvailable
                    lat
                    lon
                    allowDropoff
                }
            }`
        })
    })
    .then(function(response) {
        var result = response.json();
        console.log(result);
        return result;
    })
    .then(function(result) {
        console.log(result);
        station = result.data.bikeRentalStation;
        document.getElementById("bikes").innerHTML = station.bikesAvailable;
        document.getElementById("spaces").innerHTML = station.spacesAvailable;
    })
}

refreshNumbers();  // Once on init
setInterval(refreshNumbers, 60 * 1000);  // Then once a minute
