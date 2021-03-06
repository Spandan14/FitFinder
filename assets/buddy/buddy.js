function postBuddyRequest () {
    try {
        const endDate = document.getElementById('endDate').value        // convert to unix dates
        var endUnix = new Date(endDate.split('T')[0]).getTime()
    
        var endTime = endDate.split('T')[1]
        endTime = endTime.split(':')
        endUnix += endTime[0] * 3600
        endUnix += endTime[1] * 60
    
        const startDate = document.getElementById('startDate').value
        var startUnix = new Date(startDate.split('T')[0]).getTime()
    
        var startTime = startDate.split('T')[1]
        startTime = startTime.split(':')
        startUnix += startTime[0] * 3600
        startUnix += startTime[1] * 60
    
        var data = {                                                  // data
            activities: [],
            location: document.getElementById('location').value,
            start: startUnix,
            end: endUnix
        }

        console.log(data)
    
        const activities = ['tennis', 'basketball', 'hiking', 'volleyball', 'swimming', 'badminton']
    
        for (let i = 0; i < activities.length; i++) {
            if (document.getElementById(activities[i]).checked) {
                data.activities.push(activities[i])
            }
        }

    
        var xhr = new XMLHttpRequest();                                 // create http request and send it
        xhr.open('POST', '/buddy', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
    
        xhr.onreadystatechange = function () {                          // wait for response
            if (xhr.readyState == 4) {
                const response = xhr.responseText

                if (response === 'error') {
                    alert('There was an error posting')
                } else {
                    window.location.replace('/profile')
                }
            }
        };
    } catch {
        alert('Something isn\'t right! Check that you\'ve entered everything correctly!')
    }
}