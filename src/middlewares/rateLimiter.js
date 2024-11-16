const limitRequests = (req, res, next) => { //VERIFICO SI
    const userIp = req.ip;
    const currentTime = Date.now();

    if (!rateLimit[userIp]) {
        rateLimit[userIp] = [];
    }

    const oneHourAgo = currentTime - (60 * 60 * 1000);  // 1 hora en milisegundos

    // Filtramos las solicitudes de esa IP para ver cuáles están dentro de la última hora
    rateLimit[userIp] = rateLimit[userIp].filter(timestamp => timestamp > oneHourAgo);

    // Si el usuario ya ha hecho 3 peticiones en la última hora, bloqueamos la solicitud
    if (rateLimit[userIp].length >= 3) {
        return res.status(429).json({ message: "You have exceeded the limit of 3 requests per hour." });
    }

    // Si no ha superado el límite, registramos la nueva solicitud
    rateLimit[userIp].push(currentTime);
    next();
};

export { rateLimit }
