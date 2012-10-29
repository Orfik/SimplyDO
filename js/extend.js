xui.extend({
    is: function (selector) {
          var matchedNodes = x$(selector), i=0;
          for (i; i<matchedNodes.length; i++)
            if (this[0] == matchedNodes[i]) return true;
          return false;
     },
    delegate: function(selector, event, handler){
        this.on(event, function(evt){
            var elem = evt.target;

            if ( x$(elem).is(selector)){
                handler.apply(x$(elem), arguments);
            }
        });
    },
    parent: function () {
      var result = [], parent, i, l;
      this.each(function () {
        parent = this.parentNode;
        if (!parent._counted) {
          result[result.length] = parent;
          parent._counted = true;
        }
      });
     
      return x$(result).each(function () {
        delete this._counted;
      });
    }
});