/**
 * Created by dimuth on 10/25/16.
 */
function setCalendarDate(start){
    var calendarTime=timeStampToCalendarDate(start);
    document.getElementById("calenderDate").innerHTML=calendarTime;
}
var showNext =function () {
    var currentStart = parseInt(document.getElementById('stt').value);
    var duration = parseInt(document.getElementById('gap').value);
    document.getElementById("stt").value =currentStart+duration;
    show();
};
var showPrevious =function () {
    var currentStart = parseInt(document.getElementById('stt').value);
    var duration = parseInt(document.getElementById('gap').value);
    document.getElementById("stt").value =currentStart-duration;
    show();
};
function outputUpdate(num) {
    document.querySelector('#output').value = num;
    document.getElementById('stt').value =num;
    show();
}
function changeStep() {
    document.getElementById("valueSlider").step =document.getElementById("gap").value;
}
function timeStampToCalendarDate(time) {

    var date = new Date(parseInt(time));
    var Months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return date.getFullYear()+" "+Months[date.getMonth()]+" "+date.getDate()+"      "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
function showChunk(start,chunk,tList,xList,yList) {
    var data2=[];
    var gap=document.getElementById("gap").value;
    var e=parseInt(start)+parseInt(chunk);
    for(i=0;i<tList.length;i++ ){
        if(parseInt(tList[i])<e && parseInt(tList[i])>parseInt(start)){
            data2.push({x:xList[i] ,y:yList[i], c:(e-parseInt(tList[i]))*255/parseInt(gap)});
        }
    }
    return data2;
}
function doScaledTimeout(j,start,tList,chunk,xList,yList,cList) {
    setTimeout(function() {
        document.getElementById('stt').value=start;
        document.getElementById('output').value=start;
        setCalendarDate(start);

        var data2=showChunk(start,chunk,tList,xList,yList,cList);

        draw(data2);
    }, j * 300);
}
