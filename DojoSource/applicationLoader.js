(function(window) {
    //build.sh 会自动更新version变量
    var version = "20170104182154";
    var cdnVersion = "2.3.0";
    var cdnURL = "https://" + (window.APP_TYPE == 'ydzapp' ? 'cpp' : 'hkj') + '.static.chanjet.com/accounting/' + cdnVersion;
    var v = 'v=' + version + 'm' + (new Date().getTime()); // m为当前加载资源时的毫秒值，避免前端更新后端没更新时导致静态资源缓存问题。

    //开发时使用
    //  var _basePath = 'src/';

    //线上使用
    var _basePath = cdnURL + '/release';

    //初始化定义内容
    with(window) {
        function JSCOMPILER_PRESERVE() {};
        App = {
            basePath: _basePath
        };
        CDN_PATH = cdnURL;
    }

    var head = window.document.head || window.document.getElementsByTagName('head')[0];
    //加载CSS
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = _basePath + '/app/resource/lib.css?' + v;
    head.appendChild(link);
    //<link rel="stylesheet" type="text/css" href="release/app/resource/app.css">
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = _basePath + '/app/resource/app.css?' + v;
    head.appendChild(link);

    //加载Application
    require({
        cache: {
            'app/main': function() {
                define(["dojo/has", "require", "dojo/main"], function(b, a) {
                    a(["./Application", "./nav/Index", "dojo/domReady!"], function(a) {
                        var AppContext = new a();
                        AppContext.startUp();
                    })
                });
            }
        }
    });

    require({ cacheBust: v }, [_basePath + '/app/Application.js'],
        function() {
            require({
                baseUrl: _basePath,
                packages: [
                    { name: "dojo", location: "dojo" },
                    { name: "dijit", location: "dijit" },
                    { name: "dgrid", location: "dgrid" },
                    { name: "dojox", location: "dojox" },
                    { name: "put-selector", location: "put-selector" },
                    { name: "xstyle", location: "xstyle" },
                    { name: "chanjet", location: "chanjet" },
                    { name: "csp", location: "csp" },
                    { name: "app", location: "app" },
                    { name: "common", location: "common" },
                    { name: "jquery", location: "jquery" }
                ]
            }, ["app"]);
        }
    );
})(window);