const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
           .catch((error) => next(error));
  };
};

  export default asyncHandler;

// const asyncHandler = (fn) => async (req, res, next) =>
// {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(500).json({
//       message: 'An error occurred while processing your request.',
//       error: error.message || 'Internal Server Error',
//     });
//   }
// }
