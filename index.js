// Your code here
function createEmployeeRecord(array) {
    return {
        firstName : array[0] ,
        familyName : array[1] ,
        title : array[2],
        payPerHour : array[3] ,
        timeInEvents: [],
        timeOutEvents: []

    }   
}

function createEmployeeRecords (arrays) {
    let newArray = []

    for (const record of arrays) {
        newArray.push((createEmployeeRecord(record))); 
    }
    return newArray
}

function createTimeInEvent (employeeRecordObj, dateStamp) {
    const date = dateStamp.split(" ")[0]
    const hour = parseInt(dateStamp.split(" ")[1])

    employeeRecordObj.timeInEvents.push ({
        type: "TimeIn" ,
        hour: hour ,
        date: date
    })
    return employeeRecordObj
}

function createTimeOutEvent (employeeRecordObj, dateStamp) {
    const date = dateStamp.split(" ")[0]
    const hour = parseInt(dateStamp.split(" ")[1])

    employeeRecordObj.timeOutEvents.push ({
        type: "TimeOut" ,
        hour: hour ,
        date: date
    })
    return employeeRecordObj
}
function hoursWorkedOnDate (employeeRecordObj, dateForm) {
    let timeIn = employeeRecordObj.timeInEvents.find(item => {
        return item.date === dateForm
    }).hour
    let timeOut = employeeRecordObj.timeOutEvents.find(item => {
        return item.date === dateForm
    }).hour
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate (employeeRecordObj, dateStamp) {
    let hoursWorked = hoursWorkedOnDate (employeeRecordObj, dateStamp);
    let payRate = employeeRecordObj.payPerHour

    return (hoursWorked * payRate)

}

function allWagesFor(employeeRecordObj) {
        let payOwedDates = employeeRecordObj.timeInEvents.map(function(item){
        return item.date
    })
    let totalWages = payOwedDates.reduce((total, item) => {
        return total + wagesEarnedOnDate(employeeRecordObj, item)
    }, 0)
    return totalWages
}

function calculatePayroll (arrayOfEmployee) {
    let sumOfPay = arrayOfEmployee.reduce((total, item) => {
        return total + allWagesFor(item)
    }, 0)
       return sumOfPay
}

