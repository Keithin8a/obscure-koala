# Obscure Koala Ratings

You can see this app running on https://radiant-deploy-4mj3s.cloud.serverless.com/

It's using Serverless Cloud which lets me quickly spin up an application using the cloud with 0 infrastructure. This means I can quickly get an MVP out to validate the product idea. The free tier is very generous which should give me enough time and confidence to build out this product further.

## Design Feedback

* Button looks like it's disabled 

## MVP Logical Chunks

1. Getting main page built in HTML and CSS
    * Delivers value that the design is functional and the team (me) have all the knowledge to build it.
    * Use Stubbed data
    * No need to add star graphics yet
2. Build out the backend & Database
    * Delivers value that we can store and retrieve data.
    * We don't need to calculate the total review score, that can be done on client side
    * Backend and database sounds like a big chunk but this is a crud app and Serverless Cloud makes DB stuff really easy
    * One thing I like about doing the backend as a separate ticket is that it forces you to write tests because you can't just simply check that it works from the frontend
3. Update UI to use data from the database
    * Delivers value that we are now using real data in the UI
    * Calculate the total review score client side
4. Build Add Rating Overlay
    * This doesn't have to be a model for now, lets just add it on the page and get it hooked up.
    * Delivers value by proving out the design of the modal
    * Add the stars graphic across app.
    * Stars don't need to be interactive
5. Allow a user to submit a review
    * Delivers value by completing the main functionality of the application
    * Stars should be interactive
    * Submit review button calls backend
6. Make submit review a modal
    * Delivers value by keeping the UI clean and more user friendly
    * Call a refresh for the page data when modal closes

## Technical Choices

* I decided that I would keep all the rendering logic on the frontend in this project since we know that we are wanting to eventually use react. This reduces the risk of migration because the backend should be able to stay the same no matter how we use the frontend.
* There is probably a more efficient way of handling all the event logic but the size of the site and MVP nature getting it implemented in a way that worked felt like a better option than spending time thinking of a nicer solution

## Nice to Haves

* I would have liked to have had some frontend validation but in the interest of treating this as a real MVP that I had to get out in under 10 hours I felt that as long as the backend validation was in place and tested it was less of a concern if the frontend experience was not great.