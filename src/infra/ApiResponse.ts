class ApiResponseInfra {
    data: any;
    msg: string;

    constructor(msg: string, data: any = null) {
        this.data = data;
        this.msg = msg;
    }
}

export default ApiResponseInfra;