import { api, data, params } from '@serverless/cloud'

// api.test.js

api.get('/reviews', async (req, res) => {
  const result = await getReviews();

  console.log(params.CLOUD_URL);

  res.send({
    items: result.items
  })
})

api.post('/reviews', async (req, res) => {
  const body = req.body

  const id = (await getReviews()).items.length + 1 || 1;

  await data.set(
    `The-Minimalist-Entrepreneur:Review::${id}`,
    {
      id,
      ...body,
    }
  )

  let result = await getReviews();

  // Return the updated list of TODOs
  res.send({
    items: result.items
  })
})

// eslint-disable-next-line
api.use((err, req, res, next) => {
  console.error(err.stack);

  if (!err.statusCode) {
    err.statusCode = 500;
  }

  const error = {
    name: err.name,
    statusCode: err.statusCode,
    message: err.message,
  };

  res.status(err.statusCode).json(error);
});

const getReviews = async () => {
  const result = await data.get('The-Minimalist-Entrepreneur:Review:*');
  
  return {
    items: result.items.map(item => item.value)
  }
}
