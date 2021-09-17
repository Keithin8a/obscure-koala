const appendStars = (starElement, rating) => {
    for(let i = 0; i < 5; i++){
        const starImage = document.createElement("img");
        if(i < rating){
            starImage.src = "assets/yellowStar.svg"
        } else {
            starImage.src = "assets/star.svg"
        }
        starElement.appendChild(starImage);
    }
}

fetch('/reviews',
{
    method: "GET"
}).then(
    response => response.json()
).then(({items}) => {
    //display reviews
    const reviewList = document.getElementById("reviewList");

    let ratingSum = 0

    items.forEach(({rating, review}) => {
        ratingSum += rating;

        const container = document.createElement("div");
        container.className = "review-container";

        const star = document.createElement("div");
        star.className = "review-star"
        appendStars(star, rating);

        const ratingNum = document.createElement("div");
        ratingNum.className = "review-num"
        const ratingContent = document.createTextNode(rating);
        ratingNum.appendChild(ratingContent);

        const description = document.createElement("div");
        description.className = "review-desc"
        const descriptionContent = document.createTextNode(review);
        description.appendChild(descriptionContent);

        container.appendChild(star);
        container.appendChild(ratingNum);
        container.appendChild(description);

        reviewList.appendChild(container);
    });

    const averageRating = Math.round((ratingSum / items.length) * 10) / 10;

    const averageRatingElement = document.getElementById("averageRating");
    averageRatingElement.innerHTML = "";

    const averageRatingContent = document.createTextNode(averageRating);
    averageRatingElement.appendChild(averageRatingContent);

    const averageStarElement = document.getElementById("averageStar");
    averageStarElement.innerHTML = "";
    appendStars(averageStarElement, Math.ceil(averageRating));

}).catch(function (err) {
	console.warn('Something went wrong.', err);
});