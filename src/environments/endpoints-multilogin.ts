
export function endpointsMultilogin(host: string) {
    console.log(host);
    return {
        recebidos: `${host}/api/v1/vinculos/mlogin-obter-vinculos-recebidos`,
        concedidos: `${host}/api/v1/vinculos/mlogin-obter-vinculos-concedidos`,
    }

}

