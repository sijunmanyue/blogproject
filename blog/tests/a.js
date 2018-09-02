


getDocumentBaseUrl = function(e) {
    var t;
    return t = 0 !== e.protocol.indexOf("http") && "file:" !== e.protocol ? e.href: e.protocol + "//" + e.host + e.pathname,
    /^[^:]+:\/\/\/?[^\/]+\//.test(t) && (t = t.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(t) || (t += "/")),
    t
};


function setup () {
    var e, t, n, r, o = "";
    if (t = getDocumentBaseUrl(document.location), /^[^:]+:\/\/\/?[^\/]+\//.test(t) && (t = t.replace(/[\?#].*$/, "").replace(/[\/\\][^\/]+$/, ""), /[\/\\]$/.test(t) || (t += "/")), n = window.tinymce || window.tinyMCEPreInit)
    {
        e = n.base || n.baseURL, o = n.suffix;
        console.log(n.suffix);
        console.log('00000000000000000000000000000000');
    }
    else {
        console.log('111111111111111111111111111111111');
        for (var i = document.getElementsByTagName("script"), a = 0; a < i.length; a++) {
            var u = (r = i[a].src).substring(r.lastIndexOf("/"));
            if (/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(r)) { - 1 !== u.indexOf(".min") && (o = ".min"),
                e = r.substring(0, r.lastIndexOf("/"));
                break
            }
        } ! e && document.currentScript && ( - 1 !== (r = document.currentScript.src).indexOf(".min") && (o = ".min"), e = r.substring(0, r.lastIndexOf("/")))
    }
}

console.log(window);
console.log(this);
console.log(document.domain);
console.log(document.currentScript);
console.log(getDocumentBaseUrl(document.location));
setup();