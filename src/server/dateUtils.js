module.exports = {
    /**
     * @description Formats date in dd-mm-yyyy
     * @param {date} date
     * @returns {string} The date in the format dd-mm-yyyy
     */
    formatDate: function(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    },

    /**
     * @description Adds days to the date
     * @param {date} date
     * @param {number} days
     * @returns {number} New date with the additional days added
     */
    addDays: function(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};