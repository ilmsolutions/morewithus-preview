String.prototype.equals = function (s) {
    return new RegExp(this, 'ig').test(s);
};
//# sourceMappingURL=string.js.map