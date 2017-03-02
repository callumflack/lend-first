// https://codepen.io/geelen/pen/RGvQyJ

(() => {
    const baseUrl = 'http://res.cloudinary.com/pw-img-cdn/image/fetch'

    Array.from(document.querySelectorAll('[data-bg]')).forEach(image => {
        
        console.log(image.clientWidth)
        
        const { clientWidth, clientHeight } = image
        const pixelRatio = window.devicePixelRatio || 1.0
        const imageParams = `w_${100 * Math.round(clientWidth * pixelRatio / 100)},h_${100 * Math.round(clientHeight * pixelRatio / 100)},c_fill,g_auto,f_auto`
        const url = `${baseUrl}/${imageParams}/${image.dataset.bg}`
        
        // image.style.backgroundImage = `url('${url}')`
        image.src = url
    })
    
    // https://jsfiddle.net/idobarnoam/k89ff3ay/1/
    Array.from(document.querySelectorAll('.js-cloudinaryImageLarge')).forEach(image => {
        setTimeout(function() {
            image.classList.add('is-loaded');
        }, 1000);
    })
    
})()