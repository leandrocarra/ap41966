export class ConfigurationModel {
    constructor(
        public id?: number,
        public defaultFirstDeliveryDate?: any,
        public mobileTaxIncentive?: number,
        public npcTaxIncentive?: number,
        public mobileM1?: any,
        public mobileM2?: any,
        public npcM1?: any,
        public npcM2?: any,
        public basicCodeQuantity?: number,
        public skuQuantity?: number,
    ) {
    }
}
