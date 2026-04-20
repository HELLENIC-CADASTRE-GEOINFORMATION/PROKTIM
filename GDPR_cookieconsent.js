
window.addEventListener("load", function () {
    window.cookieconsent.initialise({
        "palette": {
            "popup": { "background": "#000", text: '#fff', link: 'yellow' },
            "button": { "background": "#f1d600" }
        },
        "theme": "classic",
        
        "elements": {
            "messagelink": '<div class="col-12 col-sm-6 col-lg-8 pb-3 pb-sm-0"><span id="cookieconsent:desc" class="cc-message">{{message}} ' 
                + '<a tabindex="0" class="kt-link" target="_blank" href="{{href}}" data-toggle="modal" data-target="#cookie-policy">{{link}}</a> <a class="kt-link" target="_blank" href="https://www.ktimanet.gr/CitizenWebApp/KT_privacy_policy.pdf">Θέλω να ελέγξω τις επιλογές μου</a>  </span></div>'
        },
        
        "content": {
            "message": "Το Ελληνικό Κτηματολόγιο ενεργεί ως υπεύθυνος επεξεργασίας και κάνει χρήση μόνο των απολύτως απαραίτητων για τη λειτουργία του ιστοτόπου τεχνικών cookies",
            "dismiss": "Έλαβα γνώση",
            "link": "Θέλω να ενημερωθώ για την Πολιτική Cookies",
            "href": "https://www.ktimanet.gr/CitizenWebApp/KT_cookie_policy.pdf"
        }
    })
});