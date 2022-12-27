const dateStringFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const dateFormat = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const auto_id = () => {
    return 'id' + (new Date()).getTime();
}

export {
    dateFormat,
    dateStringFormat,
    auto_id
}
