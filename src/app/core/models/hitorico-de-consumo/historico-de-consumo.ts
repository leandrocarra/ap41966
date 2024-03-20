export type AlertaConsumo = {
	titulo: string;
	mensagem: string;
	icone: string;
	classeIcone: "icon-green" | "icon-red";
	classeTexto: "text-green" | "text-red";
};

export type TipoVisualizacao = 'kWh' | 'RS';