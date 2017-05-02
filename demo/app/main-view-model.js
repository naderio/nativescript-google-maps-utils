var observable = require("data/observable");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);

    function HelloWorldModel() {
        _super.call(this);
        this.set("latitude", 36.800220);
        this.set("longitude", 10.186215);
        this.set("zoom", 8);
        this.set("bearing", 0);
        this.set("tilt", 0);
        this.set("padding", [40, 40, 40, 40]);
    }

    return HelloWorldModel;
})(observable.Observable);
exports.HelloWorldModel = HelloWorldModel;
exports.mainViewModel = new HelloWorldModel();