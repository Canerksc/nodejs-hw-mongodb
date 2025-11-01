import createHttpError from 'http-errors';

export const validateBody = (schema) => {
    
    const func = async (req, res, next) => {
        try { await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            const error = createHttpError(
            400,
            err.details.map((error) => error.message).join(', '),
        );
        next(error);
        }
    };
    return func;
};