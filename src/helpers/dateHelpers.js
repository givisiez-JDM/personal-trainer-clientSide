export function dateTransform(date) {
    if (!date){
        return '?'
    }

    const stringToDate = new Date(date)

    let year = stringToDate.getFullYear()
    let month = stringToDate.getMonth()+1

    if(month < 10) {
        month = "0" + month
    }
    
    let day = stringToDate.getDate()

    let newDate = `${day}/${month}/${year}`

    return newDate;
}

export function dateInverted(date) {
    if (!date){
        return '?'
    }

    const stringToDate = new Date(date)

    let year = stringToDate.getFullYear()
    let month = stringToDate.getMonth()+1

    if(month < 10) {
        month = "0" + month
    }

    let day = stringToDate.getDate()

    let newDate = `${year}-${month}-${day}`

    return newDate;
}

export function getAgeFrom(birthday) {
    if (!birthday){
        return '?'
    }
    const [birthYear, birthMonth, birthDate] = birthday.split('/')
    const today = new Date()
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() +1;
    const todayDay = today.getDate();

    const age = todayYear - parseInt(birthYear, 10)

    if (parseInt(birthMonth) > todayMonth) {
        return age - 1
    }
    if (parseInt(birthMonth) === todayMonth && parseInt(birthDate) > todayDay) {
        return age - 1
    }

    return age;
}