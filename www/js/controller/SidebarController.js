sdApp.controller('SidebarController', function ($scope, techSupport) {

    ts = techSupport.techSupport();

    $scope.techniques = ts;

    $scope.sidebar_performanceTests = [
        {labelText: 'Overview',
            linkURL: 'overview',
            support: true},
        {labelText: 'SessionStorage',
            linkURL: 'PE_sessionStorage',
            support: ts.sessionStorage},
        {labelText: 'LocalStorage',
            linkURL: 'PE_localStorage',
            support: ts.localStorage},
        {labelText: 'WebSQL',
            linkURL: 'PE_webSql',
            support: ts.webSQL},
        {labelText: 'IndexedDB',
            linkURL: 'PE_indexedDB',
            support: ts.indexedDB},
        {labelText: '(Acc)',
            linkURL: 'acc',
            support: ts.accelerometer},
        {labelText: '(Cam)',
            linkURL: 'cam',
            support: ts.camera},
        {labelText: '(directory variables)',
            linkURL: 'directoryVariables',
            support: true},
        {labelText: '(device orientation)',
            linkURL: 'devOrientation',
            support: true},
        {labelText: '(video)',
            linkURL: 'vid',
            support: true},
        {labelText: '(loadImage)',
            linkURL: 'loadImage',
            support: true}
    ];

    $scope.sidebar_plattformTests = [
        {labelText: 'SessionStorage',
            linkURL: 'PL_sessionStorage',
            support: ts.sessionStorage},
        {labelText: 'LocalStorage',
            linkURL: 'PL_localStorage',
            support: ts.localStorage}
    ];

    $scope.sidebar_demonstration = [
        {labelText: 'SessionStorage',
            linkURL: 'DE_sessionStorage',
            support: ts.sessionStorage},
        {labelText: 'LocalStorage',
            linkURL: 'DE_localStorage',
            support: ts.localStorage},
        {labelText: 'WebSQL',
            linkURL: 'DE_webSql',
            support: ts.webSQL},
        {labelText: 'IndexedDB',
            linkURL: 'DE_indexedDB',
            support: ts.indexedDB}
    ];


});