function isSmartPhone() {
    if (screen.height == 800 && screen.width == 1280) {
        return
    } else {
        location.href = "https://nagito.work/info/notsupport";

    }
}

isSmartPhone();