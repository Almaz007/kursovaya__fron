export const getFullDate = (dateForConvert) => {

    return (
        (dateForConvert.getFullYear() +
        "-" + (dateForConvert.getMonth() < 10 ? '0' + dateForConvert.getMonth() : dateForConvert.getMonth()) + 
        "-" + (dateForConvert.getDate() < 10 ? '0' + dateForConvert.getDate() : dateForConvert.getDate()) +
        "T" + (dateForConvert.getHours() < 10 ? '0' + dateForConvert.getHours() : dateForConvert.getHours())+
        ":" + (dateForConvert.getMinutes() < 10 ? '0' + dateForConvert.getMinutes() : dateForConvert.getMinutes())
        
    ))
}