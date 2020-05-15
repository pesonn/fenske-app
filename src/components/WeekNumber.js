export const WeekNumber = () => {
  // got the code from: https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  // eslint-disable-next-line no-extend-native
  Date.prototype.getWeekNumber = function (days) {
    var d = new Date(
      Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()),
    );
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 3 - dayNum + days);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  };
  let date = new Date();
  let thisweeknumber = date.getWeekNumber(1);
  let nextweeknumber = date.getWeekNumber(7);

  let weeknumberfrom = {
    thisweek: thisweeknumber,
    nextweek: nextweeknumber,
  };
  return weeknumberfrom;
};
