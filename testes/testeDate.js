let data = new Date();
console.log(typeof(data));
console.log(data);
let dataString = data.toString();
console.log(typeof(dataString));
console.log(dataString);
let dataTime = data.getTime()
console.log(typeof(dataTime));
console.log(dataTime);
let dataTime2 = new Date(dataTime)
console.log(typeof(dataTime2));
console.log(dataTime2);