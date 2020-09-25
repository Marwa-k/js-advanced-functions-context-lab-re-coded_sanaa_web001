/* Your Code Here */
let createEmployeeRecord = function (employeeInfo) {
  return {
    firstName: employeeInfo[0],
    familyName: employeeInfo[1],
    title: employeeInfo[2],
    payPerHour: employeeInfo[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function (employeesInfo) {
  return employeesInfo.map(function(employee) {
    return createEmployeeRecord(employee)
  })
}

let createTimeInEvent = function (dateWorked) {
  let [date, hour] = dateWorked.split(' ')
  let timeIn = {
    type: 'TimeIn',
    hour: parseInt(hour),
    date: date
  }
  this.timeInEvents.push(timeIn)
  return this
}

let createTimeOutEvent = function (dateWorked) {
  let [date, hour] = dateWorked.split(' ')
  let timeOut = {
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  }
  this.timeOutEvents.push(timeOut)
  return this
}

let hoursWorkedOnDate = function (dateWorked) {
  let timeIn = this.timeInEvents.find(function(e) {
    return e.date === dateWorked
  })

  let timeOut = this.timeOutEvents.find(function(e) {
    return e.date === dateWorked
  })

  return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function (dateWorked) {
  return hoursWorkedOnDate.call(this, dateWorked) * this.payPerHour
}

let findEmployeeByFirstName =  function (srcArray, firstName) {
  return srcArray.find(function(e) {
    return e.firstName === firstName
  })
}

let calculatePayroll = function (employeeRecords) {
  return employeeRecords.reduce(function(memo, i) {
    return memo + allWagesFor.call(i)
  }, 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
