let today = new Date()
let thisMonth = today.getMonth()
let thisYear = today.getFullYear()
let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]


const displayCalendar = (year, month) => {
    let savedDataSet = JSON.parse(localStorage.getItem("storedData"))
    if (savedDataSet) {
        let daysInMonth = 32 - new Date(year, month, 32).getDate();
        const calendarDiv = document.getElementById('past-calendar')
        calendarDiv.innerHTML = ''
        document.getElementById('month-title').innerText = `${monthNames[month]} ${year}`

        let i = 1
        while (i <= daysInMonth) {
            let newDiv = calendarDiv.appendChild(document.createElement('div'))
            newDiv.setAttribute('date', `${month + 1}/${i}/${year}`)
            let dataByDate = savedDataSet.filter(each => newDiv.getAttribute('date') == each.date)
            if (dataByDate.length > 0) {
                newDiv.innerHTML = `<p class="calendar-number">${i}</p>`
                dataByDate.map(
                    eachSavedMood => newDiv.innerHTML += `<span style="font-size: 22px;">${eachSavedMood.feeling}</span>: ${eachSavedMood.reason}<br />`
                )
        }
        else {
           newDiv.innerHTML = `<p class="calendar-number">${i}</p>`
        }
        i++
        }

        if (month - 1 === -1) {
            month = 12
            year = year - 1
        }

        document.getElementById('previous-month-button').innerHTML = `<input type="button" onclick="displayCalendar(${year}, ${month - 1})" value="View ${monthNames[month - 1]} ${year} Data" />`

        if (month != thisMonth) {
            document.getElementById('current-month-button').innerHTML = `<input type="button" onclick="displayCalendar(${thisYear}, ${thisMonth})" value="Back to ${monthNames[thisMonth]} ${thisYear}" />`
        }
        else {
            document.getElementById('current-month-button').innerHTML = ''
        }
    }
}

const saveToday = () => {
    const form = document.forms['today-form'].elements
    const todaysMoods = {
        date: today.toLocaleDateString(),
        feeling: form.feeling.value,
        reason: form.reason.value
    }
    let savedData = JSON.parse(localStorage.getItem("storedData"))
    if (!savedData) {
        savedData = []
    }
    savedData.push(todaysMoods)
    localStorage.setItem("storedData", JSON.stringify(savedData))
}

displayCalendar(thisYear, thisMonth)