interface Date {
   addDays(s:number): Date;
   addMonths(s:number): Date;
   addYears(s: number): Date;
   addDuration(s: string):Date;
   toDisplay(): string;
}


Date.prototype.addDays = function(s) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + s);
    return date;
    }
    
    Date.prototype.addMonths = function(s){
        var date = new Date(this.valueOf());
        date.setMonth(date.getMonth() + s);
        return date;
    }
    
    Date.prototype.addYears = function(s){
    var date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + s);
    return date;
    }
    
    Date.prototype.addDuration = function(s){
        var arr = /^([\+\-]*[0-9]+)([a-zA-Z]+)$/ig.exec(s);
        var date = new Date(this.valueOf());
        if(arr.length == 3){

            let factor = parseInt(arr[1]);

            switch(arr[2]){
                case 'd':
                    return date.addDays(factor);
                case 'wk':
                    return date.addDays(factor * 7);
                case 'mt':
                    return date.addMonths(factor);
                case 'yr':
                    return date.addYears(factor);
            }
        }
        return null;
    }

    Date.prototype.toDisplay = function(){   
            var s = new Date(this.valueOf());   
            var hours = s.getHours();
            var minutes = s.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            var strminutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + strminutes + ' ' + ampm;
            return (s.getMonth() + 1) + "/" + s.getDate() + "/" + s.getFullYear() + "  " + strTime;               
    }

