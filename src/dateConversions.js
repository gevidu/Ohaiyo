var m = new Date().getMonth(); // month 0 - 11
var dw = new Date().getDay(); // day of the week 0 - 6
var dm = new Date().getDate(); // day of the month - accurate


switch (new Date().getDay()) {
    case 0:
       	dw = "Sunday";
        break;
    case 1:
        dw = "Monday";
        break;
    case 2:
        dw = "Tuesday";
        break;
    case 3:
        dw = "Wednesday";
        break;
    case 4:
        dw = "Thursday";
        break;
    case 5:
        dw = "Friday";
        break;
    case 6:
        dw = "Saturday";
}


switch (new Date().getMonth()) {
    case 0:
       	dw = "January";
        break;
    case 1:
        dw = "February";
        break;
    case 2:
        dw = "March";
        break;
    case 3:
        dw = "April";
        break;
    case 4:
        dw = "May";
        break;
    case 5:
        dw = "June";
        break;
    case 6:
        dw = "July";
        break;
    case 7:
        dw = "August";
        break;
    case 8:
        dw = "September";
        break;
     case 9:
         dw = "October";
         break;
     case 10:
        dw = "November";
        break;
     case 11:
         dw = "December";
         break;
}