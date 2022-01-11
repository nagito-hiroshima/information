function isSmartPhone() {
    if (screen.height == 800 && screen.width == 1280) {
        return
    } else {
        location.href = "/notsupport";

    }
}

isSmartPhone();