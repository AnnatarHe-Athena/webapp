
enum IMAGE_TYPES {
    SMALL,
    NORMAL,
    LARGE
}

export function getImageUrl(url: string, type = IMAGE_TYPES.NORMAL) {
    let prefix = ''
    switch(type) {
        case IMAGE_TYPES.SMALL:
        case IMAGE_TYPES.NORMAL:
            prefix = 'https://ww4.sinaimg.cn/bmiddle/'
            break
        case IMAGE_TYPES.LARGE:
            prefix = 'https://ww4.sinaimg.cn/large/'
            break
    }
    return prefix + url
}