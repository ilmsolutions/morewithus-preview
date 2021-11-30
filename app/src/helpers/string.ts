interface String{
    equals(s: string): boolean;
}

String.prototype.equals = function(s){
     return new RegExp(this, 'ig').test(s);
}
