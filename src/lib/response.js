class RESPONSE {
    constructor (res, statusCode, statusType, message = null) {
        this.res = res;
        this.statusCode = statusCode;
        this.statusType = statusType;
        this.message = message;
    }

    send (data) {
        this.res.status(this.statusCode).json({
            code: this.statusCode,
            status: this.statusType,
            message: typeof data === 'string' ? data : this.message ? this.message : null,
            data: typeof data === 'object' ? data : null
        });
    }
}

class OK extends RESPONSE {
    constructor (res) {
        super(res, 200, 'ok');
    }
}

class FileTooLarge extends RESPONSE {
    constructor (res) {
        super(res, 400, 'error', 'file too large');
    }
}

class UnexpectedFile extends RESPONSE {
    constructor (res) {
        super(res, 400, 'error', 'unexpected file');
    }
}

class UnexpectedError extends RESPONSE {
    constructor (res) {
        super(res, 400, 'error', 'unexpected error');
    }
}

class NotFound extends RESPONSE {
    constructor (res) {
        super(res, 404, 'error', 'not found');
    }
}

module.exports = {
    OK,
    FileTooLarge,
    UnexpectedFile,
    UnexpectedError,
    NotFound
};
