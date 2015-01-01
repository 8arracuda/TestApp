/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function () {

        console.log('onDeviceReady');

        //enabling/starting AngularJS
        var htmlElement = document.getElementsByTagName("html")[0];
        angular.bootstrap(htmlElement, ['sdApp']);

    }
};

//TODO For debugging in Chrome (remove at the end)
userAgentForDesktopDevelopment1 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36';
userAgentForDesktopDevelopment2 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/600.1.25 (KHTML, like Gecko) Version/8.0 Safari/600.1.25';
if (navigator.userAgent==userAgentForDesktopDevelopment1 || navigator.userAgent==userAgentForDesktopDevelopment2) {
    setTimeout(function () {
        var htmlElement = document.getElementsByTagName("html")[0];
        angular.bootstrap(htmlElement, ['sdApp']);
    }, 2000);

}
