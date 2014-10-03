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
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
       // app.receivedEvent('deviceready');

	var xmlhttp=new XMLHttpRequest();
      xmlhttp.open("GET", "https://opentokrtc.com/cordova.json", false);
      xmlhttp.send();
      var data = JSON.parse( xmlhttp.response );

      var apiKey = '45005242';
      var sessionId = '1_MX40NTAwNTI0Mn5-MTQxMTgyMjAzODU5NH5WTEZyRktDOE5RaWNOOTlGTGQxaCs0Wnh-fg'; 
      var token = 'T1==cGFydG5lcl9pZD00NTAwNTI0MiZzaWc9MTM5NzI3NTk5NzRhNWQxODg0MGZlM2YyMjdkMWVjOTM4Mzk2NDU0YTpyb2xlPXB1Ymxpc2hlciZzZXNzaW9uX2lkPTFfTVg0ME5UQXdOVEkwTW41LU1UUXhNVGd5TWpBek9EVTVOSDVXVEVaeVJrdERPRTVSYVdOT09UbEdUR1F4YUNzMFduaC1mZyZjcmVhdGVfdGltZT0xNDEyMjQ4NTQzJm5vbmNlPTAuMTI5MjExNjQ4ODk0MTcyMjU=';

      
      var publisher = TB.initPublisher(apiKey,'myPublisherDiv');

      var session = TB.initSession( apiKey, sessionId ); 
      session.on({
        'streamCreated': function( event ){
            var div = document.createElement('div');
            div.setAttribute('id', 'stream' + event.stream.streamId);
            document.body.appendChild(div);
            session.subscribe( event.stream, div.id, {subscribeToAudio: false} );
        }
      });
      session.connect(token, function(){
        session.publish( publisher );
      });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
