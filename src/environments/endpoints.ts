const URL_LIGACAO_NOVA_SE: string = "https://qa-multiloginback-pernambuco.neoenergia.net/api/v1/sonda/token-se";

export function endpoints(host: string, hostanl: string, distribuidora: string) {
    switch (distribuidora) {

        case 'celpe':
            return {
                host: `${host}`,
                token: `${host}/token`,
                recuperarSenha: `${host}/login/1.0.0/usuarios/atualiza-senha`,
                cadastrarUsuario: `${host}/login/1.0.0/usuarios`,
                unlockUser: `${host}/Login/1.2/unlockUser`,
                cadastrarFaturaPorEmail: `${host}/faturas/1.1.1/ucs/`,
                minhaConta: `${host}/minha-conta/1.0.0/`,
                faltaEnergia: `${host}/falta-energia/1.1.0/ucs/`,
                bancos: `${host}/debito-automatico/1.0.0/bancos`,
                debitoCadastrado: `${host}/debito-automatico/1.0.0/conta-cadastrada-debito`,
                debitoAutomatico: `${host}/debito-automatico/1.0.0/ucs/`,
                autoleitura: `${host}/autoleitura/1.1.0/`,
                religacao: `${host}/religacao/1.1.0/ucs/`,
                historicoConsumo: `${host}/historicos/1.0.0/ucs/`,
                selecaoImovel: `${host}/imoveis/1.1.0/`,
                segundaVia: `${host}/faturas/1.1.1/`,
                protocolo: `${host}/protocolo/1.1.0/`,
                entendaSuaConta: `${host}/entendasuaconta/1.0.0/ucs/`,
                pix: `${host}/pix/1.0.0/`,
                marketingAutomation: `${host}/salesforce-marketing-automation/1.0.0/`,
                faturaDigital: `${host}/fatura-digital/ucs/`,
                areaNaoLogada: `${hostanl}`,
                multilogin: `${host}/multilogin/1.2.0/`,
                termoDeAdesao: `${host}/consumidores/1.0.0/`,
                dataCerta: `${host}/datacerta/1.0.0/ucs/`,
                faturaImpressa: `${host}/entrega-fatura/1.0.0/`,
                bandeiraTarifaria: `${host}/bandeira-tarifaria`
            };

        case 'coelba':
            return {
                host: `${host}`,
                token: `${host}/token`,
                recuperarSenha: `${host}/login/1.0.0/usuarios/atualiza-senha`,
                cadastrarUsuario: `${host}/login/1.0.0/usuarios`,
                unlockUser: `${host}/Login/1.2/unlockUser`,
                cadastrarFaturaPorEmail: `${host}/faturas/1.1.1/ucs/`,
                minhaConta: `${host}/minha-conta/1.0.0/`,
                faltaEnergia: `${host}/falta-energia/1.1.0/ucs/`,
                bancos: `${host}/debito-automatico/1.0.0/bancos`,
                debitoCadastrado: `${host}/debito-automatico/1.0.0/conta-cadastrada-debito`,
                debitoAutomatico: `${host}/debito-automatico/1.0.0/ucs/`,
                autoleitura: `${host}/autoleitura/1.1.0/`,
                religacao: `${host}/religacao/1.1.0/ucs/`,
                historicoConsumo: `${host}/historicos/1.0.0/ucs/`,
                selecaoImovel: `${host}/imoveis/1.1.0/`,
                segundaVia: `${host}/faturas/1.1.1/`,
                protocolo: `${host}/protocolo/1.1.0/`,
                entendaSuaConta: `${host}/entendasuaconta/1.0.0/ucs/`,
                pix: `${host}/pix/1.0.0/`,
                marketingAutomation: `${host}/salesforce-marketing-automation/1.0.0/`,
                faturaDigital: `${host}/fatura-digital/ucs/`,
                areaNaoLogada: `${hostanl}`,
                multilogin: `${host}/multilogin/1.2.0/`,
                termoDeAdesao: `${host}/consumidores/1.0.0/`,
                dataCerta: `${host}/datacerta/1.0.0/ucs/`,
                faturaImpressa: `${host}/entrega-fatura/1.0.0/`,
                bandeiraTarifaria: `${host}/bandeira-tarifaria`
            };

        case 'cosern':
            return {
                host: `${host}`,
                token: `${host}/token`,
                recuperarSenha: `${host}/login/1.0.0/usuarios/atualiza-senha`,
                cadastrarUsuario: `${host}/login/1.0.0/usuarios`,
                unlockUser: `${host}/Login/1.2/unlockUser`,
                cadastrarFaturaPorEmail: `${host}/faturas/1.1.1/ucs/`,
                minhaConta: `${host}/minha-conta/1.0.0/`,
                faltaEnergia: `${host}/falta-energia/1.1.0/ucs/`,
                bancos: `${host}/debito-automatico/1.0.0/bancos`,
                debitoCadastrado: `${host}/debito-automatico/1.0.0/conta-cadastrada-debito`,
                debitoAutomatico: `${host}/debito-automatico/1.0.0/ucs/`,
                autoleitura: `${host}/autoleitura/1.1.0/`,
                religacao: `${host}/religacao/1.1.0/ucs/`,
                historicoConsumo: `${host}/historicos/1.0.0/ucs/`,
                selecaoImovel: `${host}/imoveis/1.1.0/`,
                segundaVia: `${host}/faturas/1.1.1/`,
                protocolo: `${host}/protocolo/1.1.0/`,
                entendaSuaConta: `${host}/entendasuaconta/1.0.0/ucs/`,
                pix: `${host}/pix/1.0.0/`,
                marketingAutomation: `${host}/salesforce-marketing-automation/1.0.0/`,
                faturaDigital: `${host}/fatura-digital/ucs/`,
                areaNaoLogada: `${hostanl}`,
                multilogin: `${host}/multilogin/1.2.0/`,
                termoDeAdesao: `${host}/consumiores/1.0.0/`,
                dataCerta: `${host}/datacerta/1.0.0/ucs/`,
                faturaImpressa: `${host}/entrega-fatura/1.0.0/`,
                bandeiraTarifaria: `${host}/bandeira-tarifaria`
            };

        case 'elektro':
            return {
                host: `${host}`,
                token: `${host}/token`,
                recuperarSenha: `${host}/login/1.0.0/usuarios/atualiza-senha`,
                cadastrarUsuario: `${host}/login/1.0.0/usuarios`,
                unlockUser: `${host}/Login/1.2/unlockUser`,
                cadastrarFaturaPorEmail: `${host}/faturas/1.1.1/ucs/`,
                minhaConta: `${host}/minha-conta/1.0.0/`,
                faltaEnergia: `${host}/falta-energia/1.1.0/ucs/`,
                bancos: `${host}/debito-automatico/1.1.0/bancos`,
                debitoCadastrado: `${host}/debito-automatico/1.1.0/conta-cadastrada-debito`,
                debitoAutomatico: `${host}/debito-automatico/1.1.0/ucs/`,
                autoleitura: `${host}/autoleitura/1.1.0/`,
                religacao: `${host}/religacao/1.0.0/ucs/`,
                historicoConsumo: `${host}/historicos/1.0.0/ucs/`,
                selecaoImovel: `${host}/imoveis/1.1.0/`,
                segundaVia: `${host}/faturas/1.1.1/`,
                protocolo: `${host}/protocolo/1.1.0/`,
                entendaSuaConta: `${host}/entendasuaconta/1.0.0/ucs/`,
                pix: `${host}/pix/1.0.0/`,
                marketingAutomation: `${host}/salesforce-marketing-automation/1.0.0/`,
                faturaDigital: `${host}/fatura-digital/ucs/`,
                areaNaoLogada: `${hostanl}`,
                multilogin: `${host}/multilogin/1.2.0/`,
                termoDeAdesao: `${host}/consumidores/1.0.0/`,
                dataCerta: `${host}/datacerta/1.1.1/ucs/`,
                anexos: `${host}/anexos`,
                faturaImpressa: `${host}/entregafatura/1.0.0/`,
                ligacaoNovaSE: `${URL_LIGACAO_NOVA_SE}`,
                bandeiraTarifaria: `${host}/bandeira-tarifaria`
            };

        default:
            return {
                host: `${host}`,
                token: `${host}/token`,
                recuperarSenha: `${host}/login/1.0.0/usuarios/atualiza-senha`,
                cadastrarUsuario: `${host}/login/1.0.0/usuarios`,
                unlockUser: `${host}/Login/1.2/unlockUser`,
                cadastrarFaturaPorEmail: `${host}/faturas/1.1.1/ucs/`,
                minhaConta: `${host}/minha-conta/1.0.0/`,
                faltaEnergia: `${host}/falta-energia/1.1.0/ucs/`,
                bancos: `${host}/debito-automatico/1.1.0/bancos`,
                debitoCadastrado: `${host}/debito-automatico/1.1.0/conta-cadastrada-debito`,
                debitoAutomatico: `${host}/debito-automatico/1.1.0/ucs/`,
                autoleitura: `${host}/autoleitura/1.1.0/`,
                historicoConsumo: `${host}/historicos/1.0.0/ucs/`,
                selecaoImovel: `${host}/imoveis/1.1.0/`,
                segundaVia: `${host}/faturas/1.1.1/`,
                protocolo: `${host}/protocolo/1.1.0/`,
                entendaSuaConta: `${host}/entendasuaconta/1.0.0/ucs/`,
                pix: `${host}/pix/1.0.0/`,
                marketingAutomation: `${host}/salesforce-marketing-automation/1.0.0/`,
                faturaDigital: `${host}/fatura-digital/ucs/`,
                areaNaoLogada: `${hostanl}`,
                multilogin: `${host}/multilogin/1.2.0/`,
                termoDeAdesao: `${host}/consumidores/1.0.0/`,
                dataCerta: `${host}/datacerta/1.1.1/ucs/`,
                anexos: `${host}/anexos`,
                faturaImpressa: `${host}/entrega-fatura/1.0.0/`,
                religacao: `${host}/religacao/1.0.0/ucs/`,
                ligacaoNovaSE: `${URL_LIGACAO_NOVA_SE}`,
                bandeiraTarifaria: `${host}/bandeira-tarifaria`
            }
    }
}