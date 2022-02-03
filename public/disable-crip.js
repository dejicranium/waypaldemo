window.addEventListener('load', function() {
    if (window.location.href.indexOf('messaging') > -1) {
        if (document.getElementsByClassName('crisp-client').length > 0) {
            document.getElementsByClassName('crisp-client')[0].display = 'none'
        }  
    }
})