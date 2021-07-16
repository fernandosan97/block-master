const $circleIndicators = document.querySelectorAll('.circle');

const handleSlider = () => {
    $circleIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            handleClickSlider(index)
        });
    });
}

const handleClickSlider = (position) => {
    window.slider.style = `transform: translateX( calc(-${position}00% - (24px * ${position})) )`;
    const $circles = [ ...document.querySelectorAll('.circle-indicator')]
    $circles.forEach(circle => circle.classList.remove('active'))
    $circles[position].classList.add('active')
}

export default handleSlider;