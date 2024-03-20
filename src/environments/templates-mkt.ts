
export function codigoJornada(distribuidora: string, ambienteProd: boolean) {
    console.log(ambienteProd);
    switch (distribuidora) {

        case 'celpe':
            return {
                segundaViaFatura: ambienteProd ? 'APIEvent-1cf827e6-3125-f703-da84-50f41ec48266' : 'APIEvent-23a3d7c1-43ec-908d-cb84-cff9c08dd9fc',
                solicitacaoServico: ambienteProd ? 'APIEvent-7bebb860-4270-4326-d75b-9c495e463ff1' : 'APIEvent-7980ee68-31ea-2c8e-9263-f8227cd0f26c',
                kitBoasVindas: ambienteProd ? 'APIEvent-9db417c4-9aa7-d2e0-6ad1-f67c6416ad85' : 'APIEvent-78c7d7e3-3c22-958c-9756-39c62c9d437c',
                informativoBO: ambienteProd ? 'APIEvent-ca0f869a-d9ce-054b-450d-b9da46a3de2f' : 'APIEvent-728f9ebd-b3e3-cb6d-d176-ffe3727b3040',
                trocaAntigoTitular: ambienteProd ? 'APIEvent-3064488b-aaf8-3f83-4e8e-96b665d35b5a' : 'APIEvent-4cc83772-7b3b-3aff-7f76-266b447b1f0f',
                avisoInclusao: ambienteProd ? 'APIEvent-b6fa130a-c879-7f7e-943e-65687a26edc7' : 'APIEvent-707c57ca-35c1-5818-f96d-8f018cad9a40',
                validacao: ambienteProd ? 'APIEvent-6d27ef75-80fe-098d-35fa-1aa110fab52f' : 'APIEvent-96237f0f-bfcc-4802-ee99-a9336df3c46e',
                expiracao: ambienteProd ? 'APIEvent-60b87916-a9f9-38fd-31c5-f5131e2d21e8' : 'APIEvent-8f0d32f4-50ff-2353-f4fe-8c3daeebc747',
                esqueciSenha: ambienteProd ? 'APIEvent-ff319c4b-f3cc-b77e-ad54-dde3dd366ddc' : 'APIEvent-158d14cc-b2f1-0e07-a142-4186309bd841',
                codigoVerificador: ambienteProd ? '' : '',
                ativacao: ambienteProd ? 'APIEvent-faa8d190-e16e-3383-2278-d19229f87d03' : 'APIEvent-8dc0fe2c-3799-bce8-84f3-072917cf0ea6'
            };

        case 'coelba':
            return {
                segundaViaFatura: ambienteProd ? 'APIEvent-e14575ed-78d5-bfd8-6678-9c4e31ba79a0' : 'APIEvent-1b59a990-67e8-8c5a-3ee6-0fb7393e5953',
                solicitacaoServico: ambienteProd ? 'APIEvent-6ef81c9a-47cc-5d53-b5d0-8a2fe0e52161' : 'APIEvent-946fc850-8edc-e614-64af-3af00011d333',
                kitBoasVindas: ambienteProd ? 'APIEvent-cd3952cd-1edf-ebe4-8c0f-075f679933b5' : 'APIEvent-b644e637-7cf9-1cbe-65a2-18b478b59336',
                informativoBO: ambienteProd ? 'APIEvent-99a145b4-4d9c-bb8e-9dd3-03bee8fd8266' : 'APIEvent-6f56dfff-ba4c-4cd2-6389-8d33215234ee',
                trocaAntigoTitular: ambienteProd ? 'APIEvent-b7d38e5c-997f-6782-233e-59bbdfe959ab' : 'APIEvent-e5ba6fde-ea90-5957-a9dd-feaec7fc1c97',
                avisoInclusao: ambienteProd ? 'APIEvent-48a449ff-4af5-a02c-d0b6-d2779bbacf74' : 'APIEvent-3f6b6ab7-919f-d4cb-de47-d8917fd34c59',
                validacao: ambienteProd ? 'APIEvent-0b9f945c-34ac-843b-d7dc-e16abf8f0367' : 'APIEvent-506086d2-5e09-83fc-88a3-be61310cb8ef',
                expiracao: ambienteProd ? 'APIEvent-5dc3fd7a-854b-7fea-75c3-ac38297b11a7' : 'APIEvent-c035c021-b719-3723-e8b1-0cafd5ac5e69',
                esqueciSenha: ambienteProd ? 'APIEvent-48e8d05e-2152-663e-9abe-215ed76c4665' : 'APIEvent-611b74a5-6888-d13c-480d-fe825dc37800',
                codigoVerificador: ambienteProd ? '' : '',
                ativacao: ambienteProd ? 'APIEvent-f8d2a274-51cd-9b1b-27e6-1df92c34e017' : 'APIEvent-bb21dd38-b703-b4b9-6164-eeb210b94b93'
            };

        case 'cosern':
            return {
                segundaViaFatura: ambienteProd ? 'APIEvent-472e6bb2-ca11-c0df-e4e9-2615337bc18d' : 'APIEvent-c025d9e5-858b-a162-fad8-388bbd6a60f6',
                solicitacaoServico: ambienteProd ? 'APIEvent-f8de1056-2db2-62ae-003c-77de6f535a75' : 'APIEvent-3aa121d7-3d18-ba05-09fd-cf8b97744b4f',
                kitBoasVindas: ambienteProd ? 'APIEvent-8037f118-542c-f669-0f4f-56623e751b77' : 'APIEvent-e8e154dc-6216-f4d5-cee5-9c5c0393fe94',
                informativoBO: ambienteProd ? 'APIEvent-59d21615-9cbc-b9fc-836f-59eafb32020e' : 'APIEvent-67a1e1de-3601-e002-2abc-413aef6c8e2e',
                trocaAntigoTitular: ambienteProd ? 'APIEvent-37be72d8-19ee-80e0-b065-249cd2cabbaf' : 'APIEvent-f854e1a8-a2a9-538a-6a09-f00f77892662',
                avisoInclusao: ambienteProd ? 'APIEvent-1575b3c8-ac82-600f-6080-5fd8806a1baa' : 'APIEvent-1e441ea4-5f09-4728-70e7-ab5596edb61c',
                validacao: ambienteProd ? 'APIEvent-a2452dcf-d3c0-6fc0-f6e7-57dfc742247b' : 'APIEvent-13865f07-6d7b-8133-7ffe-eebc7045c1f1',
                expiracao: ambienteProd ? 'APIEvent-d5909cf9-03a6-50b8-09e1-5fa1da2d10f6' : 'APIEvent-424cda95-1e32-98da-c674-0d108e158ae1',
                esqueciSenha: ambienteProd ? 'APIEvent-ade333a1-ea20-1d4f-a6b6-3e8b32f0aa46' : 'APIEvent-cb4192ef-717c-fe8b-cc15-ebf7f301ad0d',
                codigoVerificador: ambienteProd ? '' : '',
                ativacao: ambienteProd ? 'APIEvent-17ab8e34-7965-926a-90d0-f808b9027855' : 'APIEvent-f12564f0-5033-6aa0-8251-88e60e8c84f5'
            };

        case 'elektro':
            return {
                segundaViaFatura: ambienteProd ? 'APIEvent-05686ced-647c-350c-78dc-6452d0efbc13' : 'APIEvent-cca3b811-ac24-9b9b-41c9-97fd4554659f',
                solicitacaoServico: ambienteProd ? 'APIEvent-43beb41e-fccc-8bbb-d27a-242edbd5c93b' : 'APIEvent-41b53607-98da-b81f-37d4-46ccb15f554d',
                kitBoasVindas: ambienteProd ? 'APIEvent-1fdef93b-93e7-2095-ff3c-02edea57a44b' : 'APIEvent-0818d84c-52c8-2432-ec7e-43157ab50f87',
                informativoBO: ambienteProd ? 'APIEvent-ebb17410-60a7-9ed2-76cf-7e969bb046f9' : 'APIEvent-ebb17410-60a7-9ed2-76cf-7e969bb046f9',
                trocaAntigoTitular: ambienteProd ? 'APIEvent-351d10a8-3f1e-1e3d-c322-2ccc5a457e0f' : 'APIEvent-a60a58f3-8af6-ae56-846c-6737901adf66',
                avisoInclusao: ambienteProd ? 'APIEvent-908e0d3e-eb6e-7335-2f27-b3f213d99e9a' : 'APIEvent-1dc1fa39-8ae4-bc32-8ce0-139ef69cd0f8',
                validacao: ambienteProd ? 'APIEvent-0e788b00-4d8a-efc1-d5c3-f599ba3f35f0' : 'APIEvent-baa6ff4c-6c36-f856-73d8-1fc9637aa0d1',
                expiracao: ambienteProd ? 'APIEvent-2fd6403c-1c4e-d904-8674-8d9eb00e9a5c' : 'APIEvent-3cb7e41a-55d3-24c1-cf6a-50835599ccd3',
                esqueciSenha: ambienteProd ? 'APIEvent-34eb8d53-bb73-9f5b-f835-4bbbde97258a' : 'APIEvent-99cd2993-a1e7-75d2-d7ec-7fae0d383bf3',
                codigoVerificador: ambienteProd ? '' : 'APIEvent-7cf604f6-7d8a-ccb7-5854-70799c03fc47',
                ativacao: ambienteProd ? 'APIEvent-cb891a24-2d64-2f08-3509-12680c30c24f' : 'APIEvent-f858e7a2-3466-5ffb-59d9-1e3e703e354f'
            };

        default:
            return {
                segundaViaFatura: ambienteProd ? 'APIEvent-05686ced-647c-350c-78dc-6452d0efbc13' : 'APIEvent-cca3b811-ac24-9b9b-41c9-97fd4554659f',
                solicitacaoServico: ambienteProd ? 'APIEvent-43beb41e-fccc-8bbb-d27a-242edbd5c93b' : 'APIEvent-41b53607-98da-b81f-37d4-46ccb15f554d',
                kitBoasVindas: ambienteProd ? 'APIEvent-1fdef93b-93e7-2095-ff3c-02edea57a44b' : 'APIEvent-0818d84c-52c8-2432-ec7e-43157ab50f87',
                informativoBO: ambienteProd ? 'APIEvent-ebb17410-60a7-9ed2-76cf-7e969bb046f9' : 'APIEvent-ebb17410-60a7-9ed2-76cf-7e969bb046f9',
                trocaAntigoTitular: ambienteProd ? 'APIEvent-351d10a8-3f1e-1e3d-c322-2ccc5a457e0f' : 'APIEvent-a60a58f3-8af6-ae56-846c-6737901adf66',
                avisoInclusao: ambienteProd ? 'APIEvent-908e0d3e-eb6e-7335-2f27-b3f213d99e9a' : 'APIEvent-1dc1fa39-8ae4-bc32-8ce0-139ef69cd0f8',
                validacao: ambienteProd ? 'APIEvent-0e788b00-4d8a-efc1-d5c3-f599ba3f35f0' : 'APIEvent-baa6ff4c-6c36-f856-73d8-1fc9637aa0d1',
                expiracao: ambienteProd ? 'APIEvent-2fd6403c-1c4e-d904-8674-8d9eb00e9a5c' : 'APIEvent-3cb7e41a-55d3-24c1-cf6a-50835599ccd3',
                esqueciSenha: ambienteProd ? 'APIEvent-34eb8d53-bb73-9f5b-f835-4bbbde97258a' : 'APIEvent-99cd2993-a1e7-75d2-d7ec-7fae0d383bf3',
                codigoVerificador: ambienteProd ? '' : 'APIEvent-7cf604f6-7d8a-ccb7-5854-70799c03fc47',
                ativacao: ambienteProd ? 'APIEvent-cb891a24-2d64-2f08-3509-12680c30c24f' : 'APIEvent-f858e7a2-3466-5ffb-59d9-1e3e703e354f'
            }
    }
}