(function() {
    let file = document.querySelector(".file-download");

    const urls = ["https://avatars.mds.yandex.net/i?id=2c3817142d183ea461ac161586b233b2e544c331-7765754-images-thumbs&n=13","https://avatars.mds.yandex.net/i?id=be8b5eb2dfca25ea100bb07962cf96f62908d9a5-8496994-images-thumbs&n=13","https://avatars.mds.yandex.net/i?id=1837ef02479c19e68c246d382bf4a51822d7ad21-8496937-images-thumbs&n=13","https://avatars.mds.yandex.net/i?id=665e7609b82c37fed972b8ed57c6e377636f7cf0-8310914-images-thumbs&n=13", "https://avatars.mds.yandex.net/i?id=09afb2d06d1d5c425beaaa8be4ba694c-5592183-images-thumbs&n=13"];

    const delay = () => new Promise(resolve => setTimeout(resolve,1000));

    const downloadReq = async () => {
    for await (const [index,url] of urls.entries()){
        await delay();
        const link = document.createElement("a");
        link.href = url;
        link.download = 'image-${index+1}';
        link.click();
    }
}
file.addEventListener('click', downloadReq);
});