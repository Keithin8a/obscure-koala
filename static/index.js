const NUMBER_OF_STARS = 5

const appendStars = (starElement, rating) => {
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starImage = document.createElement("img");
        if(i < rating){
            starImage.src = "assets/yellowStar.svg"
        } else {
            starImage.src = "assets/star.svg"
        }
        starElement.appendChild(starImage);
    }
}

const addReviewMouseOverEvent = event => {
    const rating = event.target.id.split('-')[1];
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starRating = document.getElementById(`rating-${i+1}`);
        if(i+1 <= rating) {
            starRating.src = "assets/yellowStar.svg";
        } else {
            starRating.src = "assets/star.svg";
        }
    }
}

const addReviewMouseLeaveEvent = event => {
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starRating = document.getElementById(`rating-${i+1}`);
        if(starRating.classList.contains("clicked")) {
            starRating.src = "assets/yellowStar.svg";
        } else {
            starRating.src = "assets/star.svg";
        }
    }
}

const addReviewOnClickEvent = event => {
    console.log("onClick");
    const rating = event.target.id.split('-')[1];
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starRating = document.getElementById(`rating-${i+1}`);
        if(i+1 <= rating) {
            console.log("adding Click")
            starRating.classList.add("clicked");
            starRating.src = "assets/yellowStar.svg";
        } else {
            console.log("removing Click")
            starRating.classList.remove("clicked");
            starRating.src = "assets/star.svg";
        }
    }
}

const initialiseAddReview = () => {
    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starRating = document.getElementById(`rating-${i+1}`);
        starRating.addEventListener("mouseover", addReviewMouseOverEvent)
        starRating.addEventListener("mouseleave", addReviewMouseLeaveEvent)
        starRating.addEventListener("click", addReviewOnClickEvent)
    }
}

const submitReview = () => {
    const rating = document.getElementsByClassName("clicked").length;
    const reviewInput = document.getElementById("review-input");
    const review = reviewInput.value;
    reviewInput.value = "";

    for(let i = 0; i < NUMBER_OF_STARS; i++){
        const starRating = document.getElementById(`rating-${i+1}`);
        starRating.classList.remove("clicked");
        starRating.src = "assets/star.svg";
    }

    fetch('/reviews', 
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            review,
            rating
        })
    }).then(
        response => response.json()
    ).then((data) => updateReviews(data)
    ).catch((err) => {
        console.warn('Something went wrong.', err);
    });}

const updateReviews = ({items}) => {
    const reviewList = document.getElementById("reviewList");
    while (reviewList.firstChild) {
        reviewList.firstChild.remove()
    }

    let ratingSum = 0

    items
        .sort((a, b) => a.id - b.id)
        .forEach(({rating, review}) => {
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
}

initialiseAddReview()

fetch('/reviews',
{
    method: "GET"
}).then(
    response => response.json()
).then((data) => updateReviews(data)
).catch((err) => {
	console.warn('Something went wrong.', err);
});