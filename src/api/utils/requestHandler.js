const requestHandler = async (response, callback, status = 200, allow404 = false) => {
    try {

        if (!callback || typeof callback !== "function") {
            throw new TypeError('Insert a callback into handle request!');
        }

        const ret = await callback();

        if (!ret && allow404) return response.status(status).json(ret)

        return response.status(status).json(ret)

    } catch (error) {
        return response.status(error.code || 500).json({ message: error.message });
    }
}

const writeRequestHandler = async (response, callback, status = 200) => {
    return await requestHandler(response, callback, status);
}

const readRequestHandler = async (response, callback, status = 200) => {
    return await requestHandler(response, callback, status, true);
}

module.exports = { writeRequestHandler, readRequestHandler }