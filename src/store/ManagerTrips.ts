import { defineStore } from "pinia";
import type {
  InterfaceBranchsCD,
  InterfaceDestination,
  InterfaceDriver,
  InterfaceInfoTrips,
  InterfaceSearchForNotes,
  InterfaceSearchForTravelNotes,
  InterfaceTrips,
  InterfaceVehicles,
} from "./types";

export const useMyManagerStore = defineStore("myManagerStoreTrips", () => {
  const { $api, $toast } = useNuxtApp();

  const state = reactive({
    isOpenAbount: false,
    isOpenChangePassword: false,
    driver: {
      data: [] as InterfaceDriver[],
      isLoading: false,
      params: { name: "", cpf: "", isEdition: false, id: 0 },
    },
    vehicles: {
      data: [] as InterfaceVehicles[],
      isLoading: false,
      params: {
        mark: "",
        model: "",
        plate: "",
        chassis: "",
        isEdition: false,
        id: 0,
      },
    },
    trips: {
      data: [] as InterfaceTrips[],
      isLoading: false,
      params: {
        description: "",
        initialOdometer: 0,
        odometerFinal: 0,
        departureDate: "",
        returnDate: "",
        truckId: 0,
        distributionCenterId: 0 as number,
        driverId: 0,
        isEdition: false,
        selectedTrip: 0,
      },
      branchsCD: [] as InterfaceBranchsCD[],
      destinations: { data: [] as InterfaceDestination[], isLoading: false },
      registrationTrips: {
        data: [] as InterfaceDestination[],
        isLoading: false,
      },
      registerDestination: {
        params: {
          sequence: 0 as number,
          description: "",
          branchDestinationID: 0,
          tripID: 0,
          isEdition: false,
        },
      },
      travelInfo: { data: {} as InterfaceInfoTrips, isLoading: false },
      notes: {
        data: [] as InterfaceSearchForTravelNotes[],
        isLoading: false,
        params: { data: {} as InterfaceSearchForNotes, isLoading: false },
        xmls: { isLoading: false },
        isSavingNote: false, 
      },
    },
  });
  const getters = {};
  const actions = {
    // ROTAS MOTORISTA
    clearInputsDriver() {
      state.driver.params.name = "";
      state.driver.params.cpf = "";
      state.driver.params.id = 0;
      state.driver.params.isEdition = false;
    },

    async getDriver() {
      state.driver.isLoading = true;
      await $api
        .get("tms/buscar_motoristas", { params: {} })
        .then(({ data }) => {
          state.driver.data = data.drivers;
          state.driver.isLoading = false;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
          state.driver.isLoading = false;
        });
    },

    async registerDriver() {
      let removeCpfMask = state.driver.params.cpf.replace(/\D/g, "");

      await $api
        .post("/tms/cadastrar_motorista", {
          name: state.driver.params.name,
          cpf: removeCpfMask,
        })
        .then(({ data }) => {
          this.getDriver();
          this.clearInputsDriver();
          $toast.success("Cadastrado com sucesso!");
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async updateDriver() {
      let removeCpfMask = state.driver.params.cpf.replace(/\D/g, "");

      await $api
        .post("/tms/atualizar_motorista", {
          nome: state.driver.params.name,
          cpf: removeCpfMask,
          id: state.driver.params.id,
        })
        .then(({ data }) => {
          this.getDriver();
          this.clearInputsDriver();
          $toast.success("Edição salva com sucesso!");
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async deleteDriver(driver: InterfaceDriver) {
      driver.isLoadingDelete = true;
      await $api
        .delete("/tms/apagar_motorista", { params: { id_driver: driver.id } })
        .then(({ data }) => {
          driver.isOpenModalDelete = false;
          driver.isLoadingDelete = false;
          this.getDriver();
          $toast.success("Deletado com sucesso!");
        })
        .catch((err) => {
          driver.isLoadingDelete = false;
          $toast.error(getApiError(err));
        });
    },

    async updateConcise() {
      await $api
        .post("/tms/atualizar_consisa")
        .then(({ data }) => {
          $toast.success("Atualizado com sucesso!");
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    // ROTAS CAMINHÃO
    clearInputsVehicles() {
      state.vehicles.params.mark = "";
      state.vehicles.params.model = "";
      state.vehicles.params.plate = "";
      state.vehicles.params.chassis = "";
      state.vehicles.params.isEdition = false;
    },

    async getVehicles() {
      await $api
        .get("/tms/buscar_veiculos")
        .then(({ data }) => {
          state.vehicles.data = data.veiculos;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async registerVehicles() {
      await $api
        .post("/tms/cadastrar_veiculo", {
          marca: state.vehicles.params.mark,
          modelo: state.vehicles.params.model,
          placa: state.vehicles.params.plate,
          chassi: state.vehicles.params.chassis,
        })
        .then(({ data }) => {
          this.getVehicles();
          this.clearInputsVehicles();
          $toast.success(data);
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async updateVehicles() {
      await $api
        .post("/tms/atualizar_veiculo", {
          id: state.vehicles.params.id,
          marca: state.vehicles.params.mark,
          modelo: state.vehicles.params.model,
          placa: state.vehicles.params.plate,
          chassi: state.vehicles.params.chassis,
        })
        .then(({ data }) => {
          this.getVehicles();
          this.clearInputsVehicles();
          $toast.success(data);
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async deleteVehicles(vehicles: InterfaceVehicles) {
      await $api
        .delete("/tms/apagar_veiculo", { params: { id_vehicles: vehicles.id } })
        .then(({ data }) => {
          this.getVehicles();
          $toast.success(data);
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    // ROTAS VIAGENS
    clearInputsTrips() {
      state.trips.params.description = "";
      state.trips.params.initialOdometer = 0;
      state.trips.params.odometerFinal = 0;
      state.trips.params.departureDate = "";
      state.trips.params.returnDate = "";
      state.trips.params.truckId = 0;
      state.trips.params.distributionCenterId = 0;
      state.trips.params.driverId = 0;
      state.trips.params.selectedTrip = 0;
      state.trips.params.isEdition = false;
    },

    clearInputsFormDestination() {
      state.trips.registerDestination.params.branchDestinationID = 0;
      state.trips.registerDestination.params.sequence = 0;
      state.trips.registerDestination.params.tripID = 0;
      state.trips.registerDestination.params.description = "";
      state.trips.registerDestination.params.isEdition = false;
    },

    async getTrips() {
      state.trips.isLoading = true;
      await $api
        .get("/tms/buscar_viagens")
        .then(({ data }) => {
          state.trips.data = data.viagens;
          state.trips.isLoading = false;
        })
        .catch((err) => {
          state.trips.isLoading = false;
          $toast.error(getApiError(err));
        });
    },

    async registerTrips() {
      await $api
        .post("/tms/cadastrar_viagem", {
          descricao: state.trips.params.description,
          odometro_inicial: state.trips.params.initialOdometer,
          odometro_final: state.trips.params.odometerFinal,
          data_saida: state.trips.params.departureDate,
          data_retorno: state.trips.params.returnDate,
          caminhao_id: state.trips.params.truckId,
          centro_de_distribuicao_id: state.trips.params.distributionCenterId,
          motorista_id: state.trips.params.driverId,
        })
        .then(({ data }) => {
          this.getTrips();
          this.clearInputsTrips();
          $toast.success(data);
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async getBranchsCD() {
      await $api
        .get("/tms/filiais_cd")
        .then(({ data }) => {
          state.trips.branchsCD = data.cds;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async getDestination() {
      await $api
        .get("/tms/filiais")
        .then(({ data }) => {
          state.trips.destinations.data = data.filiais;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    async getSearchTravelDestinations(tripID: number) {
      await $api
        .get("/tms/buscar_destinos_viagens", { params: { viagem_id: tripID } })
        .then(({ data }) => {
          state.trips.registrationTrips.data = data.viagem_destino;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
        });
    },

    // CRIA DESTINO
    async postRegisterDestination() {
      await $api
        .post("/tms/cadastrar_destino", {
          sequencia: state.trips.registerDestination.params.sequence,
          descricao: state.trips.registerDestination.params.description,
          destino_id:
            state.trips.registerDestination.params.branchDestinationID,
          viagem_id: state.trips.registerDestination.params.tripID,
        })
        .then(({ data }) => {
          this.getSearchTravelDestinations(
            state.trips.registerDestination.params.tripID
          );
          $toast.success(data, {
            style: { "z-index": 999999999 },
          });
        })
        .catch((err) => {
          $toast.error(getApiError(err), {
            style: { "z-index": 999999999 },
          });
        });
    },

    // ATUALIZA DESTINO
    async updateTravelDestination() {
      await $api
        .post("/tms/atualizar_destino_viagem", {
          sequencia: state.trips.registerDestination.params.sequence,
          descricao: state.trips.registerDestination.params.description,
          destino_id: state.trips.registerDestination.params.tripID,
        })
        .then(({ data }) => {
          state.trips.registerDestination.params.isEdition = false;
          this.getSearchTravelDestinations(state.trips.params.selectedTrip);
          this.clearInputsFormDestination();
          $toast.success(data, {
            style: { "z-index": 999999999 },
          });
        })
        .catch((err) => {
          $toast.error(getApiError(err), {
            style: { "z-index": 999999999 },
          });
        });
    },

    async getTravelInfo(travelID: number) {
      await $api
        .get("/tms/info_viagem", { params: { id_viagem: travelID } })
        .then(({ data }) => {
          state.trips.travelInfo.data = data.info_viagens;
        })
        .catch((err) => {
          $toast.error(getApiError(err));
          state.trips.travelInfo.data = {};
        });
    },

    async deleteTravelDestination(travelDestination: InterfaceDestination) {
      await $api
        .delete("/tms/apagar_destino_viagem", {
          params: { id_travel_destination: travelDestination.id },
        })
        .then(({ data }) => {
          travelDestination.isDeleteTravelDestination = false;
          this.getSearchTravelDestinations(state.trips.params.selectedTrip);
          $toast.success(data, {
            style: { "z-index": 999999999 },
          });
        })
        .catch((err) => {
          $toast.error(getApiError(err), {
            style: { "z-index": 999999999 },
          });
        });
    },

    // ROTAS - BUSCAR NOTAS
    clearInputsFormNotes() {
      state.trips.notes.params.data = {};
    },

    async getSearchForTravelNotes() {
      state.trips.notes.isLoading = true;
      await $api
        .get("/tms/buscar_notas_viagem", {
          params: { id_viagem: state.trips.params.selectedTrip },
        })
        .then(({ data }) => {
          state.trips.notes.data = data.notas_viagens;
          state.trips.notes.isLoading = false;
        })
        .catch((err) => {
          state.trips.notes.isLoading = false;
          $toast.error(getApiError(err));
        });
    },

    async getSearchForNotes(idNote: InterfaceSearchForTravelNotes) {
      state.trips.notes.params.isLoading = true;
      await $api
        .get("/tms/buscar_nota", { params: { id_nota: idNote.id } })
        .then(({ data }) => {
          state.trips.notes.params.data = data.info_nota;
          state.trips.notes.params.isLoading = false;
        })
        .catch((err) => {
          state.trips.notes.params.data = {};
          state.trips.notes.params.isLoading = false;
          $toast.error(getApiError(err));
        });
    },

    async deleteNote(idNote: InterfaceSearchForTravelNotes) {
      await $api
        .delete("/tms/excluir_nota_de_viagem", {
          params: { id_nota: idNote.id },
        })
        .then(({ data }) => {
          this.getSearchForTravelNotes();
          $toast.success(data, {
            style: { "z-index": 999999999 },
          });
        })
        .catch((err) => {
          $toast.error(getApiError(err), {
            style: { "z-index": 999999999 },
          });
        });
    },

    async insertTravelNote() {
      state.trips.notes.isSavingNote = true;
      $api.post("/tms/inserir_nota_viagem", {
        chave: state.trips.notes.params.data.chave,
        id_viagem: state.trips.params.selectedTrip,
      }).then(({ data }) => {
        this.getSearchForTravelNotes();
        this.clearInputsFormNotes();
        state.trips.notes.isSavingNote = false;
        $toast.success(data, {
          style: { "z-index": 999999999 },
        });
      })
      .catch((err) => { 
        state.trips.notes.isSavingNote = false;
        $toast.error(getApiError(err), {
        style: { "z-index": 999999999 },
      }) })
    },

    async getXMLS() {
      state.trips.notes.xmls.isLoading = true;
      $api
        .get("/tms/xmls", {
          params: { id_trip: state.trips.params.selectedTrip },
          responseType: "blob",
        })
        .then(({ data }) => {
          state.trips.notes.xmls.isLoading = false;
          downloadBlob(`viagem_${state.trips.params.selectedTrip}.xml`, data);
        })
        .catch((err) => {
          state.trips.notes.xmls.isLoading = false;
          $toast.error(getApiError(err));
        });
    },
  };

  return { state, actions, getters };
});
