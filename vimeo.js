function toggle_html5_player(obj, on) {
    if (on) {
        setCookie('html_player', 1, 365);
    } 
    else {
        setCookie('html_player', 0, 365);
    }
    reload_page();
}
