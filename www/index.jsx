(function() {
  'use strict';

  var worldcomponent = function(initialVal) {
    var computingF = [];
    var value = {};
    var state;
    Object.defineProperties(value, {
      val: { //value.val
        get: function() {
          return state;
        },
        set: function(x) {
          state = x;
          computingF.map(function(f) {
            f(x);
          });
          return;
        }
      }
    });
    var o = {
      compute: function(f) {
        var f1 = function() {
          computingF[computingF.length] = f; //push  f
          value.val = initialVal;
        };
        return f1;
      },
      appear: function(a) {
        var f1 = function() {
          value.val = a;
        };
        return f1;
      },
      now: function() {
        return value.val;
      }
    };

    return o;
  };

  Object.defineProperties(worldcomponent, {
    world: { //our physical world
      set: function(f) {
        return f();
      }
    }
  });

  worldcomponent.log = function(a) {
    var f = console.log.bind(console, a);
    return f;
  };

  var ___ = worldcomponent;

  var smode;

  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || (ua.indexOf('Android') > 0) && (ua.indexOf('Mobile') > 0) || ua.indexOf('Windows Phone') > 0) {
    smode = true;
  } else {
    smode = false;
  }

  var socket = io();

  var BtnComponent = React.createClass({
    ___color: ___("#ffae00"),
    componentWillMount: function() {
      var com = this;
      ___.world = com.___color.compute(function(x) {
        com.forceUpdate();
      });
    },
    onMouseOver: function() {
      var com = this;
      ___.world = com.___color.appear("#ffbf22");
    },
    onMouseOut: function() {
      var com = this;
      ___.world = com.___color.appear("#ffae00");
    },
    onMouseDown: function() {
      var com = this;
      ___.world = com.___color.appear("#ddaa11");
    },
    onMouseUp: function() {
      var com = this;
      ___.world = com.___color.appear("#ffbf22");
    },
    render: function() {
      var com = this;
      var btnStyle = {
        "padding": "5px 5px",
        "vertical-align": "middle",
        "margin": "0 0",
        "position": "relative",
        "background-color": com.___color.now(),
        "border-radius": "4px",
        "color": "#222",
        "font-size": "30px",
//    "line-height": "42px",
        "-webkit-transition": " none",
        "transition": "none",
        "text-shadow": "0 1px 1px rgba(0, 0, 0, .3)"
      };

      var imageLink;

      if (com.props.togo === "CHECKOUT") {
        imageLink = "./images/android-shopping-cart.svg";
      } else {
        imageLink = "./images/android-add-shopping-cart.svg";
      }

      var ulStyle = {
        "display": "table",
        "margin": "0 0 0 0",
        "padding": "0 0"

      };

      var liStyle = {
        "display": "table-cell",
        "margin": "0 0 0 0",
        "padding": "0 0",
        "vertical-align": "middle",
        "text-align": "center"
      };
      var el = (
        <button onMouseDown={com.onMouseDown} onMouseOut={com.onMouseOut} onMouseOver={com.onMouseOver} onMouseUp={com.onMouseUp} style={btnStyle}>

          <ul style={ulStyle}>
            <li style={liStyle}>
              <img height="50" src={imageLink}/></li>
            <li style={liStyle}>
              {com.props.txt}</li>
          </ul>

        </button>

      );
      return el;
    }
  });

  var WrapperComponent = React.createClass({
    render: function() {
      var divStyle = {
        "margin": "0 0 0 0",
        "padding": "0 0"
      };

      var el = (
        <div style={divStyle}>
          <NaviComponent/>
          <ContentComponent/>
        </div>
      );
      return el;
    }
  });

  var NaviComponent = React.createClass({
    render: function() {

      var divStyle = {
        "height": "75px",
        "position": "fixed",
        "z-index": "999",
        "background-color": "blue",
        "margin": "0 0 0 0",
        "padding": "0 0"

      };

      var ulStyle = {
        "display": "table",
        "background-color": "red",
        "margin": "0 0 0 0",
        "padding": "100 100"
      };

      var liStyle = {
        "display": "table-cell",
        "background-color": "green",
        "margin": "0 0 0 0",
        "padding": "0 0",
        "vertical-align": "middle",
        "text-align": "center"
      };

      var el = (
        <div style={divStyle}>

          <ul style={ulStyle}>
            <li style={liStyle}><img height="75" src="./images/ttlogo.png" width="100"/></li>
            <li style={liStyle}>
              <BtnComponent togo="CHECKOUT" txt="CHECK OUT"/></li>
          </ul>

        </div>
      );
      return el;
    }
  });

  var ContentComponent = React.createClass({
    render: function() {
      var divStyle = {
        "padding": "110px 0 0 0"
      };

      var el = (
        <div style={divStyle}>
          this is content<br/>

          <BtnComponent togo="678687678" txt="ADD TO CART"/>
        </div>
      );
      return el;
    }
  });

  var mount = React.render(<WrapperComponent/>, document.body);

}
());
