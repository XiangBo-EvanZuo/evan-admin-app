const baseUrl = 'http://10.37.119.235:8765';
export const request = (
    url: string,
    data: Record<string, string>,
) => {
    return new Promise((resolve, reject) => {
        const requestUrl = baseUrl + url;
        uni.request({
            url: requestUrl,
            data,
            method: 'POST',
            timeout: 30000,
            success: resolve,
            fail: reject,
        });
    });
};

