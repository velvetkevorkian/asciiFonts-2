/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4,
maxerr: 50, node: true */
/*global $*/

(function () {
    "use strict";

    var os = require("os");
    //ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
    var figlet = require("./node_modules/figlet/lib/node-figlet");


    function cmdGetMemory() {
        return {
            total: os.totalmem(),
            free: os.freemem()
        };
    }

    function cmdConvertText() {
        var output= figlet.text('Fucking work!', {
            font: 'Doom',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return "uh oh";
            }
            console.log(data);
        });
    }


    function init(DomainManager) {
        if (!DomainManager.hasDomain("simple")) {
            DomainManager.registerDomain("simple", {
                major: 0,
                minor: 1
            });
        }
        DomainManager.registerCommand(
            "simple", // domain name
            "getMemory", // command name
            cmdGetMemory, // command handler function
            false, // this command is synchronous
            "Returns the total and free memory on the user's system in bytes", [], // no parameters
            [{
                name: "memory",
                type: "{total: number, free: number}",
                description: "amount of total and free memory in bytes"
            }]
        );

        DomainManager.registerCommand(
            "simple", // domain name
            "convertText", // command name
            cmdConvertText, // command handler function
            false, // this command is synchronous
            "Returns the total and free memory on the user's system in bytes", [], // no parameters
            [{
                name: "memory",
                type: "{data: text}",
                description: "some text"
            }]
        );
    }

    exports.init = init;

}());