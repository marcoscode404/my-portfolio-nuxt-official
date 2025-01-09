export interface InterfaceDriver {
  apagado: boolean;
  cpf: string;
  demitido: boolean;
  id: number;
  id_consisa?: number;
  nome: string;
  isOpenModalDelete?: boolean;
  isLoadingDelete?: boolean;
}

export interface InterfaceVehicles {
  chassi: string;
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  isOpenModalDelete?: boolean;
  isLoadingDelete?: boolean;
}

export interface InterfaceTrips {
  descricao: string;
  odometro_inicial: number;
  odometro_final: number;
  data_saida: string;
  data_retorno: string;
  destinos: string;
  caminhao_id: number;
  centro_de_distribuicao_id: number;
  motorista_id: number;
  isEdition: boolean;
  isOpenModalDelete?: boolean;
  isOpenModalInfo?: boolean;
  id: number;
}

export interface InterfaceBranchsCD {
  id: number;
  nome_reduzido: string;
}

export interface InterfaceDestination {
  id: number;
  nome: string;
}

export interface InterfaceDestination {
  destino: string;
  id: number;
  sequencia: number;
  descricao: string;
  filial_id_destino: number;
  isDeleteTravelDestination?: boolean;
}

export interface InterfaceInfoTrips {
  centro_de_distribuicao?: string;
  consumo_medio?: number;
  data_retorno?: string;
  data_saida?: string;
  descricao?: string;
  destinos?: string;
  distancia_percorrida?: number;
  gasto_abastecimento?: number;
  total_notas?: number;
  volume_abastecido?: number;
  volume_notas?: number;
}

export interface InterfaceSearchForTravelNotes {
  destino: string;
  id: number;
  numero: string;
  origem: string;
  valor: number;
  volume: number;
  isOpenModalDeleteNote?: boolean;
}

export interface InterfaceSearchForNotes {
  chave?: string;
  destino?: string;
  id?: number;
  numero?: string;
  origem?: string;
  valor?: number;
  volume?: number;
}
