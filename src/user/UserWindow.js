function OpenWindow(e) {
    var classNameNow = e.target.parentElement.children[0].className;
    if (classNameNow === "user-window"){
        e.target.parentElement.children[0].className ="user-window-hidden"
        classNameNow = "user-window-hidden"
    }else if (classNameNow === "user-window-hidden"){
        e.target.parentElement.children[0].className ="user-window"
    }
}

export default OpenWindow;