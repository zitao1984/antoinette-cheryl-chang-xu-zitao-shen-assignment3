export const LOGIN_STATE = {
    LOGGED_IN: "logged in",
    LOGGED_OUT: "logged out",
    INVALID_LOGIN: "invalid login",
    NETWORK_ERROR: "network error"
}

export const NOTE_TYPE = {
    TEXT: "text",
    LINK: "link"
}

export const emptyPost =
    {
        type: NOTE_TYPE.TEXT,
        text: "",
        url: "",
        title: "",
    }
