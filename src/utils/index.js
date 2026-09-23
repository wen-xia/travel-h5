const scrBottom = (scrollClass, contentClass) => {
    const scrollElement = document.getElementsByClassName(scrollClass)[0];
    const contentElement = document.getElementsByClassName(contentClass)[0];
    scrollElement.scrollTop = contentElement.scrollHeight;
}

export {
    scrBottom
}

export default {}